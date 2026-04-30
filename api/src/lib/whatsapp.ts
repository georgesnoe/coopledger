import axios from "axios";

export class WhatsAppService {
	private static apiUrl = process.env.GOWA_API_URL || "http://localhost:3000";
	private static apiKey = process.env.GOWA_API_KEY;

	static async sendMessage(to: string, message: string, deviceId?: string) {
		try {
			const response = await axios.post(
				`${WhatsAppService.apiUrl}/send/message`,
				{
					number: to,
					message: message,
				},
				{
					headers: {
						"X-Device-Id": deviceId || process.env.GOWA_DEFAULT_DEVICE_ID,
						Authorization: `Bearer ${WhatsAppService.apiKey}`,
					},
				},
			);
			return response.data;
		} catch (error: any) {
			console.error(
				"Error sending WhatsApp message:",
				error.response?.data || error.message,
			);
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
