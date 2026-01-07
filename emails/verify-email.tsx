import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface VerifyEmailProps {
    verificationUrl: string;
    userName?: string;
}

export const VerifyEmail = ({
    verificationUrl,
    userName,
}: VerifyEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Vérifiez votre adresse email pour activer votre compte</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={logoContainer}>
                        <Heading style={h1}>LGK Immo</Heading>
                    </Section>

                    <Heading style={h2}>
                        Bienvenue{userName ? ` ${userName}` : ""} !
                    </Heading>

                    <Text style={text}>
                        Merci de vous être inscrit sur LGK Immo. Pour activer votre compte
                        et commencer à utiliser nos services, veuillez vérifier votre
                        adresse email en cliquant sur le bouton ci-dessous.
                    </Text>

                    <Section style={buttonContainer}>
                        <Button style={button} href={verificationUrl}>
                            Vérifier mon email
                        </Button>
                    </Section>

                    <Text style={text}>
                        Ou copiez et collez ce lien dans votre navigateur :
                    </Text>

                    <Link href={verificationUrl} style={link}>
                        {verificationUrl}
                    </Link>

                    <Text style={footer}>
                        Ce lien expirera dans 24 heures. Si vous n&apos;avez pas créé de
                        compte sur LGK Immo, vous pouvez ignorer cet email en toute
                        sécurité.
                    </Text>

                    <Text style={footer}>
                        © {new Date().getFullYear()} LGK Immo. Tous droits réservés.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

export default VerifyEmail;

const main = {
    backgroundColor: "#f6f9fc",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
    maxWidth: "600px",
};

const logoContainer = {
    margin: "0 auto",
    padding: "20px 0 20px",
    textAlign: "center" as const,
};

const h1 = {
    color: "#10b981",
    fontSize: "32px",
    fontWeight: "bold",
    margin: "0",
    padding: "0",
};

const h2 = {
    color: "#1f2937",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "30px 0",
    padding: "0",
    textAlign: "center" as const,
};

const text = {
    color: "#4b5563",
    fontSize: "16px",
    lineHeight: "26px",
    textAlign: "center" as const,
    padding: "0 40px",
};

const buttonContainer = {
    padding: "27px 0 27px",
    textAlign: "center" as const,
};

const button = {
    backgroundColor: "#10b981",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px 40px",
};

const link = {
    color: "#10b981",
    fontSize: "14px",
    textDecoration: "underline",
    wordBreak: "break-all" as const,
    padding: "0 40px",
    display: "block",
    textAlign: "center" as const,
};

const footer = {
    color: "#9ca3af",
    fontSize: "12px",
    lineHeight: "20px",
    textAlign: "center" as const,
    padding: "0 40px",
    marginTop: "32px",
};
