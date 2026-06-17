import axios from "axios";
import TicketPayment from "../../models/reservation/ticketPaymentSchema.js";

const tossPayment = async (req, res) => {
  const {
    paymentKey,
    orderId,
    amount,
    orderName,
    showId,
    date,
    time,
    seatNumbers,
    userId,
  } = req.body;

  console.log("결제 요청 데이터:", req.body);

  // Toss 서버사이드 검증
  const widgetSecretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
  const encryptedSecretKey =
    "Basic " + Buffer.from(widgetSecretKey + ":").toString("base64");

  try {
    // 1. Toss 서버에 결제 확인 요청 (실제 결제금액 검증)
    const tossResponse = await axios.post(
      "https://api.tosspayments.com/v1/payments/confirm",
      { orderId, amount, paymentKey },
      {
        headers: {
          Authorization: encryptedSecretKey,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Toss 검증 응답:", tossResponse.data);

    // 2. 검증 통과 후 DB 저장
    const payment = new TicketPayment({
      showId,
      date,
      time,
      seatNumbers,
      userId,
      orderId,
      paymentKey,
      amount,
      orderName,
      status: "success",
    });

    await payment.save();
    console.log("결제 정보 저장 완료:", payment);
    res.status(200).json({ message: "결제가 완료되었습니다.", payment });

  } catch (error) {
    console.error("결제 처리 중 오류:", error.response?.data || error.message);

    // Toss 검증 실패 시
    if (error.response) {
      return res.status(error.response.status).json({
        message: error.response.data.message || "결제 검증에 실패했습니다.",
        code: error.response.data.code,
      });
    }
    res.status(500).json({ message: "결제 처리 중 오류가 발생했습니다." });
  }
};

export { tossPayment };