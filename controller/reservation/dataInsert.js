import mongoose from "mongoose";
import Show from "../../models/reservation/showSchema.js";

await mongoose.connect("mongodb+srv://showU:1234@showu.ceinf.mongodb.net/", {
  dbName: "showu"
});

await Show.insertMany([
  {
    name: "뮤지컬 <데스노트>",
    venue: "세종문화회관 대극장",
    dates: "2024.03.01 - 2024.06.30",
    duration: "160분",
    grade: "8세 이상",
    price: { R: "170,000원", S: "130,000원" },
    type: "일반예매",
    discounts: ["조기예매 할인 20%", "재관람 할인 15%"],
    img: "/images/reservation/show6.jpg",
    detailImage: "/images/reservation/show3/show3-1.jpg",
    cast: [
      { name: "유현석", img: "/images/reservation/show3/show3-2.jpg" },
      { name: "김수연", img: "/images/reservation/show3/show3-3.jpg" },
      { name: "김지온", img: "/images/reservation/show3/show3-4.jpg" },
      { name: "김찬종", img: "/images/reservation/show3/show3-5.jpg" },
      { name: "원태민", img: "/images/reservation/show3/show3-6.jpg" }
    ],
    times: ["14:00", "19:00"],
    hearts: [],
    comments: []
  },
  {
    name: "뮤지컬 <비스티>",
    venue: "브릭스씨어터",
    dates: "2024.03.01 - 2024.06.30",
    duration: "160분",
    grade: "8세 이상",
    price: { R: "170,000원", S: "130,000원" },
    type: "일반예매",
    discounts: ["조기예매 할인 20%", "재관람 할인 15%"],
    img: "/images/reservation/show7.jpg",
    detailImage: "/images/reservation/show3/show3-1.jpg",
    cast: [
      { name: "유현석", img: "/images/reservation/show3/show3-2.jpg" },
      { name: "김수연", img: "/images/reservation/show3/show3-3.jpg" },
      { name: "김지온", img: "/images/reservation/show3/show3-4.jpg" },
      { name: "김찬종", img: "/images/reservation/show3/show3-5.jpg" },
      { name: "원태민", img: "/images/reservation/show3/show3-6.jpg" }
    ],
    times: ["14:00", "19:00"],
    hearts: [],
    comments: []
  },
  {
    name: "뮤지컬 <죽음에 관하여>",
    venue: "링크아트센터 페이코홀",
    dates: "2024.03.01 - 2024.06.30",
    duration: "160분",
    grade: "8세 이상",
    price: { R: "170,000원", S: "130,000원" },
    type: "일반예매",
    discounts: ["조기예매 할인 20%", "재관람 할인 15%"],
    img: "/images/reservation/show8.jpg",
    detailImage: "/images/reservation/show3/show3-1.jpg",
    cast: [
      { name: "유현석", img: "/images/reservation/show3/show3-2.jpg" },
      { name: "김수연", img: "/images/reservation/show3/show3-3.jpg" },
      { name: "김지온", img: "/images/reservation/show3/show3-4.jpg" },
      { name: "김찬종", img: "/images/reservation/show3/show3-5.jpg" },
      { name: "원태민", img: "/images/reservation/show3/show3-6.jpg" }
    ],
    times: ["14:00", "19:00"],
    hearts: [],
    comments: []
  },
  {
    name: "뮤지컬 <공명>",
    venue: "LG아트센터 서울 LG SIGNATURE 홀",
    dates: "2024.04.01 - 2024.07.31",
    duration: "170분",
    grade: "7세 이상",
    price: { R: "180,000원", S: "140,000원" },
    type: "일반예매",
    discounts: ["조기예매 할인 20%", "청소년 할인 30%"],
    img: "/images/reservation/show9.jpg",
    detailImage: "/images/reservation/show4/show4-1.jpg",
    cast: [
      { name: "조정은", img: "/images/reservation/show4/show4-2.jpg" },
      { name: "신성록", img: "/images/reservation/show4/show4-3.jpg" },
      { name: "김준수", img: "/images/reservation/show4/show4-4.jpg" },
      { name: "전동석", img: "/images/reservation/show4/show4-5.jpg" },
      { name: "고은성", img: "/images/reservation/show4/show4-6.jpg" }
    ],
    times: ["14:00", "19:30"],
    hearts: [],
    comments: []
  },
  {
    name: "뮤지컬 <청새치>",
    venue: "링크아트센터드림 드림2관",
    dates: "2024.05.01 - 2024.08.31",
    duration: "130분",
    grade: "13세 이상",
    price: { R: "80,000원", S: "60,000원" },
    type: "일반예매",
    discounts: ["조기예매 할인 15%", "단체 할인 20%"],
    img: "/images/reservation/show10.jpg",
    detailImage: "/images/reservation/show5/show5-1.jpg",
    cast: [
      { name: "차규민", img: "/images/reservation/show5/show5-2.jpg" },
      { name: "박경호", img: "/images/reservation/show5/show5-3.jpg" },
      { name: "이동연", img: "/images/reservation/show5/show5-4.jpg" },
      { name: "이세헌", img: "/images/reservation/show5/show5-5.jpg" },
      { name: "이승준", img: "/images/reservation/show5/show5-6.jpg" }
    ],
    times: ["15:00", "19:00"],
    hearts: [],
    comments: []
  }
  
]);

console.log("공연 데이터 추가 완료!");
await mongoose.disconnect();