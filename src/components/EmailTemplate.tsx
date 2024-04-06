import { Body, Button, Container, Column, Head, Heading, Hr, Html, Img, Link, Preview, Row, Section, Text, } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

interface EmailTemplateProps {
    data: {
        firstName: string,
        lastName: string,
        phoneNumber: string,
        email: string,
        area: string,
        message: string
    }
}

export default function EmailTemplate({ data: { firstName, lastName, phoneNumber, email, area, message } }: EmailTemplateProps) {
    return (
        <Html lang="en">
            <Head />
            <Tailwind>
                <Body className="font-sans">
                    <Container className="m-0 py-16 w-[580px] max-w-[100%]">
                        <Section className="pb-5">
                            <Row>
                                <Text className="text-3xl font-bold">Message from {firstName} {lastName} ({email})</Text>
                                <Text className="text-lg bg-black/10 rounded-md px-10 py-6">{message}</Text>
                            </Row>
                        </Section>
                        <Hr className="border-gray-500 mt-4"></Hr>
                        <Section>
                            <Row>
                                <Text className="text-xl">Other Info:</Text>
                                <Text className="text-lg">Phone Number: {phoneNumber}</Text>
                                <Text className="text-lg">Area: {area}</Text>
                            </Row>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}