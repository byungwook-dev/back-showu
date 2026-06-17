import RentalPayment from "../../models/reservation/rentalPaymentSchema.js";

const rentalTossPayment = async (req, res) => {
  const {
    paymentKey,
    orderId,
    amount,
    orderName,
    spaceId,
    userId,
    spaceLocation,
    rentalPeriod,
  } = req.body;

  console.log("결제 요청 데이터:", req.body);

  const widgetSecretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
  const encryptedSecretKey =
    "Basic " + Buffer.from(widgetSecretKey + ":").toString("base64");

  try {
    // Toss 서버사이드 검증
    const tossResponse = await fetch(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        method: "POST",
        headers: {
          Authorization: encryptedSecretKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, amount, paymentKey }),
      }
    );

    if (!tossResponse.ok) {
      const errorData = await tossResponse.json();
      return res.status(tossResponse.status).json({
        message: errorData.message || "결제 검증에 실패했습니다.",
        code: errorData.code,
      });
    }

    const tossData = await tossResponse.json();
    console.log("Toss 검증 응답:", tossData);

    // 검증 통과 후 DB 저장
    const payment = new RentalPayment({
      spaceId,
      userId,
      orderId,
      paymentKey,
      amount,
      orderName,
      spaceLocation,
      rentalPeriod,
      status: "success",
    });

    await payment.save();
    console.log("결제 정보 저장 완료:", payment);
    res.status(200).json({ message: "결제가 완료되었습니다.", payment });

  } catch (error) {
    console.error("결제 처리 중 오류:", error.message);
    res.status(500).json({ message: "결제 처리 중 오류가 발생했습니다." });
  }
};

export { rentalTossPayment };