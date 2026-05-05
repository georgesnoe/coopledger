import axios from "axios";

// biome-ignore lint/complexity/noStaticOnlyClass: ignore
export class WhatsAppService {
	private static apiUrl = process.env.GOWA_URL || "http://localhost:3000";
	private static getAuthHeader() {
		const user = process.env.GOWA_AUTH_USER;
		const password = process.env.GOWA_AUTH_PASSWORD;
		if (!user || !password) {
			throw new Error("GOWA_AUTH_USER and GOWA_AUTH_PASSWORD are required");
		}
		const credentials = Buffer.from(`${user}:${password}`).toString("base64");
		return `Basic ${credentials}`;
	}

	private static formatPhoneNumber(phone: string) {
		const cleaned = phone.replace(/^(\+|00)/, "").replace(/[\s\-()]/g, "");
		return `${cleaned}@s.whatsapp.net`;
	}

	static async sendMessage(to: string, message: string, deviceId?: string) {
		try {
			const response = await axios.post(
				`${WhatsAppService.apiUrl}/send/message`,
				{
					phone: to,
					message: message,
				},
				{
					headers: {
						Authorization: WhatsAppService.getAuthHeader(),
					},
				},
			);
			return response.data;
		} catch (error: unknown) {
			const err = error as Error & { response?: unknown };
			console.error("Error sending WhatsApp message:", err.message);
			throw error;
		}
	}

	static async sendConfirmationCode(phoneNumber: string, code: string) {
		const message = `Your CoopLedger confirmation code is: ${code}. Please enter this code in the app to verify your account.`;
		return WhatsAppService.sendMessage(phoneNumber, message);
	}

	static async sendVoteNotification(
		phoneNumber: string,
		voteQuestion: string,
		result: string,
	) {
		const message = `The vote for "${voteQuestion}" has finished!\n\nResult: ${result}\n\nThank you for participating in CoopLedger!`;
		return WhatsAppService.sendMessage(phoneNumber, message);
	}
}

