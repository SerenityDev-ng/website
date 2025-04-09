import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface CleaningServiceEmailProps {
  email: string;
  name: string;
  location: string;
  house: string;
  serviceType: string;
  cleaningType?: string;
  laundryType?: string;
  price: number;
  frequency: string;
  time: string;
  phone: string;
  videoUrls: string[];
}

export const CleaningServiceEmail = ({
  email,
  name,
  location,
  house,
  serviceType,
  cleaningType,
  laundryType,
  price,
  frequency,
  time,
  phone,
  videoUrls,
}: CleaningServiceEmailProps) => {
  console.log({ videoUrls });
  return (
    <Html>
      <Head />
      <Preview>Your Cleaning Service Booking Confirmation</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-5 px-4">
            <Heading className="text-2xl font-bold text-center mb-4">
              Cleaning Service Booking Confirmation
            </Heading>
            <Text className="text-base mb-4">Dear {name},</Text>
            <Text className="text-base mb-4">
              Here are the booking details of {name}:
            </Text>
            <Text className="text-base mb-4 text-center">{email}:</Text>
            <Section className="bg-gray-100 rounded-lg p-4 mb-4">
              <Text className="text-sm mb-2">
                <strong>Phone Number:</strong> {phone}
              </Text>
              <Text className="text-sm mb-2">
                <strong>Location:</strong> {location}
              </Text>
              <Text className="text-sm mb-2">
                <strong>House:</strong> {house}
              </Text>
              <Text className="text-sm mb-2">
                <strong>Service Type:</strong> {serviceType}
              </Text>
              {serviceType === "cleaning" && (
                <Text className="text-sm mb-2">
                  <strong>Cleaning Type:</strong> {cleaningType}
                </Text>
              )}
              {serviceType === "laundry" && (
                <Text className="text-sm mb-2">
                  <strong>Laundry Type:</strong> {laundryType}
                </Text>
              )}
              <Text className="text-sm mb-2">
                <strong>Price:</strong> &#8358;{price}
              </Text>
              <Text className="text-sm mb-2">
                <strong>Frequency:</strong> {frequency}
              </Text>
              <Text className="text-sm">
                <strong>Time:</strong> {time}
              </Text>
              {videoUrls.length > 0 && (
                <Text className="text-sm">
                  <strong>Videos:</strong> {videoUrls.join(", ")}
                </Text>
              )}
            </Section>
            <Hr className="border-gray-300 my-4" />
            <Text className="text-sm text-center text-gray-600">
              If you have any questions, please contact our customer service.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default CleaningServiceEmail;
