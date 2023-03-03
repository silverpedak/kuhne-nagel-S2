import { Card, CardBody, CardHeader, Container } from "reactstrap";

import { BoxHeader } from "@/views/layout/headers";

export const CompanyAnalyticsMainPanel = (): JSX.Element => {
  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">Company Analytics</h3>
          </CardHeader>
          <CardBody>Analytics go here...</CardBody>
        </Card>
      </Container>
    </>
  );
};
