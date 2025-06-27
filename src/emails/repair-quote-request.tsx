import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Hr,
  Row,
  Column,
} from "@react-email/components";

interface RepairQuoteRequestEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  streetAddress2?: string;
  city: string;
  state: string;
  postalCode: string;
  description: string;
  selectedService?: {
    title: string;
    price: number;
    text: string;
  };
  files?: string[];
}

export const RepairQuoteRequestEmail = ({
  firstName,
  lastName,
  email,
  phone,
  streetAddress,
  streetAddress2,
  city,
  state,
  postalCode,
  description,
  selectedService,
  files = [],
}: RepairQuoteRequestEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        New repair quote request from {firstName} {lastName}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Heading style={h1}>Serenity Repair Services</Heading>
            <Text style={subtitle}>New Quote Request</Text>
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
            <Heading style={h2}>Service Address</Heading>
            <Text style={value}>{streetAddress}</Text>
            {streetAddress2 && <Text style={value}>{streetAddress2}</Text>}
            <Text style={value}>
              {city}, {state} {postalCode}
            </Text>
          </Section>

          {selectedService && (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Heading style={h2}>Selected Service</Heading>
                <Text style={serviceTitle}>{selectedService.title}</Text>
                <Text style={value}>{selectedService.text}</Text>
                <Text style={price}>
                  Estimated Price: ₦{selectedService.price.toLocaleString()}
                </Text>
              </Section>
            </>
          )}

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>Service Description</Heading>
            <Text style={description as any}>{description}</Text>
          </Section>

          {files.length > 0 && (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Heading style={h2}>Attached Images</Heading>
                <Text style={value}>
                  {files.length} image(s) attached to this request
                </Text>
                {files.map((imageUrl, index) => (
                  <div key={index} style={{marginBottom: '16px'}}>
                    <Text style={fileItem}>
                      📷 Image {index + 1}:
                    </Text>
                    <Img
                      src={imageUrl}
                      alt={`Repair request image ${index + 1}`}
                      width="300"
                      height="200"
                      style={{
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        objectFit: 'cover',
                        display: 'block',
                        marginBottom: '8px'
                      }}
                    />
                  </div>
                ))}
              </Section>
            </>
          )}

          <Hr style={hr} />

          <Section style={section}>
            <Text style={footer}>
              This quote request was submitted through the Serenity website.
              Please respond within 24 hours to maintain our service commitment.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default RepairQuoteRequestEmail;

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

const h2 = {
  color: "#1a1a1a",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "0 0 16px",
};

const section = {
  padding: "24px",
  border: "1px solid #e6e6e6",
  borderRadius: "8px",
  margin: "16px 0",
};

const column = {
  width: "50%",
  paddingRight: "12px",
};

const label = {
  color: "#666666",
  fontSize: "14px",
  fontWeight: "bold",
  margin: "0 0 4px",
};

const value = {
  color: "#1a1a1a",
  fontSize: "16px",
  margin: "0 0 12px",
};

const serviceTitle = {
  color: "#1a1a1a",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 8px",
};

const price = {
  color: "#059669",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "8px 0 0",
};

const description = {
  color: "#1a1a1a",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const fileItem = {
  color: "#666666",
  fontSize: "14px",
  margin: "4px 0",
};

const footer = {
  color: "#666666",
  fontSize: "14px",
  textAlign: "center" as const,
  fontStyle: "italic",
  margin: "0",
};

const hr = {
  borderColor: "#e6e6e6",
  margin: "20px 0",
};
