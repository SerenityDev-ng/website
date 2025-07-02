import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Row,
  Column,
} from "@react-email/components";

interface LaundryOrderRequestEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  pickupDate: string;
  pickupTime: string;
  specialInstructions?: string;
  selectedService: {
    title: string;
  };
  orderSummary?: {
    mensItems?: { [key: string]: number };
    womensItems?: { [key: string]: number };
    childrensItems?: { [key: string]: number };
    extraItems?: { [key: string]: number };
    totalAmount: number;
  };
}

export const LaundryOrderRequestEmail = ({
  firstName,
  lastName,
  email,
  phone,
  address,
  pickupDate,
  pickupTime,
  specialInstructions,
  selectedService,
  orderSummary,
}: LaundryOrderRequestEmailProps) => {
  // Format date for better readability
  const formattedDate = new Date(pickupDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Html>
      <Head />
      <Preview>
        New laundry order request from {firstName} {lastName}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Heading style={h1}>Serenity Laundry Services</Heading>
            <Text style={subtitle}>New Order Request</Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>Customer Information</Heading>
            <Row>
              <Column style={column}>
                <Text style={label}>Name:</Text>
                <Text style={value}>
                  {firstName} {lastName}
                </Text>
              </Column>
              <Column style={column}>
                <Text style={label}>Email:</Text>
                <Text style={value}>{email}</Text>
              </Column>
            </Row>
            <Row>
              <Column style={column}>
                <Text style={label}>Phone:</Text>
                <Text style={value}>{phone}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>Pickup Information</Heading>
            <Text style={label}>Address:</Text>
            <Text style={value}>{address}</Text>
            <Row>
              <Column style={column}>
                <Text style={label}>Pickup Date:</Text>
                <Text style={value}>{formattedDate}</Text>
              </Column>
              <Column style={column}>
                <Text style={label}>Pickup Time:</Text>
                <Text style={value}>{pickupTime}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>Service Details</Heading>
            <Text style={serviceTitle}>{selectedService.title}</Text>

            {orderSummary && (
              <>
                <Text style={label}>Order Items:</Text>

                {orderSummary.mensItems &&
                  Object.keys(orderSummary.mensItems).length > 0 && (
                    <>
                      <Text style={categoryLabel}>Men&apos;s Items:</Text>
                      {Object.entries(orderSummary.mensItems).map(
                        ([item, quantity]) =>
                          quantity > 0 && (
                            <Text key={item} style={itemStyle}>
                              {item}: {quantity}
                            </Text>
                          )
                      )}
                    </>
                  )}

                {orderSummary.womensItems &&
                  Object.keys(orderSummary.womensItems).length > 0 && (
                    <>
                      <Text style={categoryLabel}>Women&apos;s Items:</Text>
                      {Object.entries(orderSummary.womensItems).map(
                        ([item, quantity]) =>
                          quantity > 0 && (
                            <Text key={item} style={itemStyle}>
                              {item}: {quantity}
                            </Text>
                          )
                      )}
                    </>
                  )}

                {orderSummary.childrensItems &&
                  Object.keys(orderSummary.childrensItems).length > 0 && (
                    <>
                      <Text style={categoryLabel}>Children&apos;s Items:</Text>
                      {Object.entries(orderSummary.childrensItems).map(
                        ([item, quantity]) =>
                          quantity > 0 && (
                            <Text key={item} style={itemStyle}>
                              {item}: {quantity}
                            </Text>
                          )
                      )}
                    </>
                  )}

                {orderSummary.extraItems &&
                  Object.keys(orderSummary.extraItems).length > 0 && (
                    <>
                      <Text style={categoryLabel}>Extra Items:</Text>
                      {Object.entries(orderSummary.extraItems).map(
                        ([item, quantity]) =>
                          quantity > 0 && (
                            <Text key={item} style={itemStyle}>
                              {item}: {quantity}
                            </Text>
                          )
                      )}
                    </>
                  )}

                <Text style={price}>
                  Total Amount: ₦{orderSummary.totalAmount.toLocaleString()}
                </Text>
              </>
            )}
          </Section>

          {specialInstructions && (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Heading style={h2}>Special Instructions</Heading>
                <Text style={instructionsStyle}>{specialInstructions}</Text>
              </Section>
            </>
          )}

          <Hr style={hr} />

          <Section style={section}>
            <Text style={footer}>
              This order request was submitted through the Serenity website.
              Please process this order within 24 hours to maintain our service
              commitment.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default LaundryOrderRequestEmail;

// Styles
const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "600px",
};

const logoSection = {
  padding: "20px 0",
  textAlign: "center" as const,
  backgroundColor: "#f8f9fa",
  borderRadius: "8px 8px 0 0",
};

const h1 = {
  color: "#1a1a1a",
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0 0 8px",
  textAlign: "center" as const,
};

const subtitle = {
  color: "#666666",
  fontSize: "16px",
  margin: "0",
  textAlign: "center" as const,
};

const section = {
  padding: "16px 0",
};

const h2 = {
  color: "#1a1a1a",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "0 0 16px",
};

const hr = {
  borderColor: "#e6e6e6",
  margin: "16px 0",
};

const column = {
  padding: "0 8px",
};

const label = {
  color: "#666666",
  fontSize: "14px",
  margin: "0 0 4px",
  fontWeight: "bold",
};

const value = {
  color: "#1a1a1a",
  fontSize: "16px",
  margin: "0 0 16px",
};

const serviceTitle = {
  color: "#059669",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 16px",
};

const categoryLabel = {
  color: "#1a1a1a",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "16px 0 8px",
};

const itemStyle = {
  color: "#1a1a1a",
  fontSize: "14px",
  margin: "0 0 4px",
  paddingLeft: "16px",
};

const price = {
  color: "#059669",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "16px 0 0",
};

const instructionsStyle = {
  color: "#1a1a1a",
  fontSize: "16px",
  margin: "0",
  lineHeight: "1.5",
};

const footer = {
  color: "#666666",
  fontSize: "14px",
  fontStyle: "italic",
  margin: "0",
  textAlign: "center" as const,
};
