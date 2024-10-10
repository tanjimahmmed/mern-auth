import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async(email, verificationToken) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        });

        console.log("Email sent successfully", response);
        
    }catch(error){
        console.error(`Error sending verification email`, error);

        throw new Error(`Error sending verification email: ${error}`)
    }
}

export const sendWelcomeEmail = async(email, name) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "a6b966c2-2fef-457c-b18e-8ca5ca949b9f",
            template_variables: {
                company_info_name: "Auth Company",
                name: name
            }
        })
        console.log("Welcome email sent successfully", response);
        
    } catch (error) {
        console.error(`Error sending welcome email`, error);

        throw new Error(`Error sending welcome email: ${error}`)
    }
}

export const sendPasswordResetEmail = async(email, resetURL) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        })
    } catch(error){
        console.error(`Error sending password reset email`, error)

        throw new Error(`Error sending password reset email: ${error}`)
    }
}

export const sendResetSuccessEmail = async(email) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_REQUEST_TEMPLATE,
            category: "password Reset"
        })

        console.log("Password reset email sent successfully", response);
        
    }catch(error){
        console.error(`Error sending password reset success email`, error);
        throw new Error(`Error sending password reset success email: ${error}`)
    }
}