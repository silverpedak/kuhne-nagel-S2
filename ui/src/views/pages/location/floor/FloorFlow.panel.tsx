import { memo, useRef, useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Connection,
  Edge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Node,
  Position,
  NodeChange,
  updateEdge,
  HandleType,
  Panel,
} from "reactflow";
import { Button, ButtonGroup } from "reactstrap";

import { Asset, Room } from "@/types/domain";
import { AssetUi, SelectOption } from "@/types/ui/common-ui";
import { AssetType, EMPTY_ASSET_UI, TYPE_OPTIONS } from "@/common/consts";
import { useAppDispatch, useAppSelector } from "@/redux/app";
import { selectAsset, selectCurrentAsset, updateRoom } from "@/redux/features";
import { alerts } from "@/views/components/feedback";

import { CreateAssetPanel } from "./create-asset";
import { CustomControls } from "./CustomControls";
import { setupEdges, setupNodes, setupRooms } from "./flow";
import { DetailsAssetMain } from "./details";
import { nodeTypes } from "./nodes";

interface FloorFlowProps {
  rooms: Room[];
}

const FloorFlowPanel = ({ rooms }: FloorFlowProps) => {
  const { getNodes, project, addNodes, getIntersectingNodes } = useReactFlow();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const edgeUpdateSuccessful = useRef(true);
  const [nodes, setNodes] = useNodesState(setupNodes(rooms));
  const [edges, setEdges] = useEdgesState(setupEdges(rooms));
  const [typeSelected, setTypeSelected] = useState<SelectOption>(TYPE_OPTIONS[0]);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState<boolean>(false);
  const [isCreatePanelOpen, setIsCreatePanelOpen] = useState<boolean>(false);
  const [assetUi, setAssetUi] = useState<AssetUi>(EMPTY_ASSET_UI);
  const [createMode, setCreateMode] = useState<boolean>(false);
  const [addingNodeEnabled, setAddingNodeEnabled] = useState<boolean>(false);

  const currentAsset = useAppSelector(selectCurrentAsset);
  const dispatch = useAppDispatch();

  const toggleCreateMode = () => setCreateMode(!createMode);
  const toggleDetailsPanel = () => setIsDetailsPanelOpen(!isDetailsPanelOpen);
  const toggleCreatePanel = () => setIsCreatePanelOpen(!isCreatePanelOpen);

  useEffect(() => {
    setNodes(setupNodes(rooms));
    setEdges(setupEdges(rooms));
  }, [rooms]);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes(nds => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes: any) => {
    setEdges(eds => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const updatedParams = { ...params, animated: true };
      setEdges(els => {
        return addEdge(updatedParams, els);
      });
    },
    [setEdges]
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge: Edge, newConnection: Connection) => {
    edgeUpdateSuccessful.current = true;
    setEdges(els => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback(
    (_event: MouseEvent, edge: Edge<any>, _handleType: HandleType) => {
      if (!edgeUpdateSuccessful.current) {
        setEdges(eds => eds.filter(e => e.id !== edge.id));
      }
    },
    []
  );

  //Fix: position calculation when room position !== {x: 0, y: 0}
  const addNodeOnClick = useCallback(
    (event: React.MouseEvent) => {
      if (
        (event.target as HTMLElement).classList.contains("react-flow__room") &&
        wrapperRef.current &&
        addingNodeEnabled
      ) {
        const roomId = parseInt((event.target as HTMLElement).id);
        const { top, left } = wrapperRef.current.getBoundingClientRect();
        const id = nodes.length + 1;
        const room = nodes.find(node => node.id === roomId.toString());
        if (room) {
          const { x: roomX, y: roomY } = room.position;
          const position = project({
            x: event.clientX - left - 25 - roomX,
            y: event.clientY - top - 25 - roomY,
          });
          const assetData: Asset = {
            id,
            name: assetUi.name,
            type: assetUi.type.label.toLowerCase(),
            position,
            roomId,
            connections: [],
          };
          const newNode: Node = {
            id: `${id}`,
            data: assetData,
            position,
            type: assetUi.type.label.toLocaleLowerCase(),
            parentNode: `${roomId}`,
            targetPosition: Position.Left,
            sourcePosition: Position.Right,
            zIndex: 2,
          };
          addNodes(newNode);
          setAddingNodeEnabled(false);
        }
      }
    },
    [wrapperRef, assetUi, addingNodeEnabled]
  );

  const changeAssetRoomByDrag = useCallback(
    (_event: React.MouseEvent, node: Node, _nodes: Node[]) => {
      const intersectingNodes = getIntersectingNodes(node);
      const roomNodeFound = intersectingNodes.find(node => node.type === AssetType.Room);
      if (!roomNodeFound || !node.positionAbsolute) return;
      const calculatedPosition = {
        x: node.positionAbsolute.x - roomNodeFound.position.x,
        y: node.positionAbsolute.y - roomNodeFound.position.y,
      };
      const updatedNode = {
        ...node,
        position: calculatedPosition,
        roomNode: roomNodeFound.id,
        data: {
          ...node.data,
          roomId: roomNodeFound.data.id,
        },
      };
      const filteredNodes = getNodes().filter(tempNode => tempNode.id !== node.id);
      filteredNodes.push(updatedNode);
      setNodes(filteredNodes);
    },
    []
  );

  const viewAssetDetails = useCallback(async (_event: React.MouseEvent, node: Node) => {
    if (node.type === AssetType.Room) return;
    dispatch(selectAsset(node.data));
    setIsDetailsPanelOpen(true);
  }, []);

  const saveRooms = async (rooms: Room[]) => {
    for (let room of rooms) {
      dispatch(updateRoom(room));
    }
    alerts.successAlert("", "Saved!");
  };

  const onResetLayoutEdit = async () => {
    const { isConfirmed } = await alerts.confirmActionAlert(
      "you want to cancel updates?",
      "Are you sure"
    );
    if (isConfirmed) {
      setNodes(setupNodes(rooms));
      setEdges(setupEdges(rooms));
      setCreateMode(false);
    }
  };

  const onDeleteAsset = async (assetId: number) => {
    const newNodes = nodes.filter(node => node.id !== assetId.toString());
    const roomsToSave = setupRooms(newNodes, edges, rooms);
    await saveRooms(roomsToSave);
  };

  const onUpdateAsset = async (assetId: number, name: string) => {
    const nodeIndex = nodes.findIndex(node => node.id === assetId.toString());
    if (nodeIndex !== -1) {
      let nodeToUpdate = { ...nodes[nodeIndex], data: { ...nodes[nodeIndex].data, name: name } };
      let updatedNodes = [
        ...nodes.slice(0, nodeIndex),
        nodeToUpdate,
        ...nodes.slice(nodeIndex + 1),
      ];
      const roomsToSave = setupRooms(updatedNodes, edges, rooms);
      await saveRooms(roomsToSave);
    }
  };

  const onSaveChanges = async () => {
    const { isConfirmed } = await alerts.confirmActionSuccess(
      "you want to save changes?",
      "Are you sure"
    );
    if (isConfirmed) {
      const roomsToSave = setupRooms(nodes, edges, rooms);
      saveRooms(roomsToSave);
    }
  };

  return (
    <>
      <DetailsAssetMain
        asset={currentAsset}
        isOpen={isDetailsPanelOpen}
        toggle={toggleDetailsPanel}
        onSave={onUpdateAsset}
        onDelete={onDeleteAsset}
      />
      {createMode ? (
        <CreateAssetPanel
          isOpen={isCreatePanelOpen}
          toggle={toggleCreatePanel}
          assetUi={assetUi}
          setAssetUi={setAssetUi}
          typeSelected={typeSelected}
          setTypeSelected={setTypeSelected}
          setAddingNodeEnabled={setAddingNodeEnabled}
        />
      ) : null}
      <div ref={wrapperRef} className="shadow rounded wrapper" style={{ height: "600px" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          snapToGrid
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onClick={addNodeOnClick}
          onNodeDragStop={changeAssetRoomByDrag}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
          onNodeClick={viewAssetDetails}
          nodesDraggable={createMode}
          edgesFocusable={createMode}
          fitView
        >
          <CustomControls toggle={toggleCreateMode} />
          {createMode ? (
            <>
              <Panel position="top-left">
                <Button onClick={() => setIsCreatePanelOpen(true)} size="sm" className="bg-white">
                  <i className="fa-regular fa-square-plus fa-lg" />
                </Button>
              </Panel>
              <Panel position="top-right">
                <ButtonGroup size="sm">
                  <Button color="success" onClick={onSaveChanges}>
                    <i className="fa fa-floppy-disk fa-lg" />
                  </Button>
                  <Button color="danger" onClick={onResetLayoutEdit}>
                    <i className="fa fa-rectangle-xmark fa-lg" />
                  </Button>
                </ButtonGroup>
              </Panel>
            </>
          ) : null}
        </ReactFlow>
      </div>
    </>
  );
};

export default memo(FloorFlowPanel);
