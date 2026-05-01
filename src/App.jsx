import React, { useMemo, useState } from "react";

const dataTypes = [
  {
    title: "ข้อมูลระบุตัวตน",
    icon: "👤",
    examples: "ชื่อ นามสกุล เลขบัตรประชาชน รูปถ่าย เพศ วันเดือนปีเกิด หนังสือเดินทาง",
    color: "from-rose-100 to-red-50",
  },
  {
    title: "ข้อมูลสำหรับการติดต่อ",
    icon: "📮",
    examples: "ที่อยู่ อีเมล หมายเลขโทรศัพท์ หมายเลขโทรศัพท์มือถือ",
    color: "from-sky-100 to-blue-50",
  },
  {
    title: "ข้อมูลอ่อนไหว/ข้อมูลสุขภาพ",
    icon: "🫀",
    examples: "ศาสนา ข้อมูลสุขภาพ หมู่โลหิต ประวัติการรักษา ประวัติแพ้ยา ประวัติทันตกรรม ข้อมูลชีวภาพ",
    color: "from-red-100 to-orange-50",
  },
  {
    title: "ข้อมูลเพื่อวินิจฉัยหรือติดตามการรักษา",
    icon: "🩺",
    examples: "ปัจจัยเสี่ยง อุบัติเหตุ พฤติกรรมสุขภาพ การถ่ายภาพนิ่งหรือภาพเคลื่อนไหวตามหลักวิชาชีพ",
    color: "from-violet-100 to-purple-50",
  },
  {
    title: "ข้อมูลทางการเงินและสิทธิรักษา",
    icon: "💳",
    examples: "ธุรกรรม วิธีชำระเงิน รายละเอียดการชำระเงิน สิทธิประกันสุขภาพ ประกันสังคม สวัสดิการราชการ",
    color: "from-amber-100 to-yellow-50",
  },
  {
    title: "บัญชีผู้ใช้และสื่อสังคมออนไลน์",
    icon: "🔐",
    examples: "ชื่อผู้ใช้ รหัสผ่าน ความคิดเห็น การซักถาม การโต้ตอบในสื่อสังคมออนไลน์",
    color: "from-emerald-100 to-teal-50",
  },
];

const lifecycle = [
  {
    title: "เก็บเท่าที่จำเป็น",
    icon: "📥",
    detail: "เก็บรวบรวมข้อมูลตามวัตถุประสงค์ของการให้บริการ และตาม Privacy Notice อย่างเคร่งครัด",
  },
  {
    title: "ขอความยินยอมเมื่อจำเป็น",
    icon: "✅",
    detail: "ขอความยินยอมก่อนหรือขณะเก็บรวบรวมข้อมูล เว้นแต่เป็นกรณีที่กฎหมายยกเว้น",
  },
  {
    title: "ใช้และเปิดเผยตามวัตถุประสงค์",
    icon: "📋",
    detail: "ใช้และเปิดเผยเพื่อพันธกิจของโรงพยาบาล หรือตามที่กฎหมายกำหนดเท่านั้น",
  },
  {
    title: "เก็บรักษาอย่างปลอดภัย",
    icon: "🛡️",
    detail: "รักษาความลับตามชั้นความลับของข้อมูล และจัดเก็บผ่านระบบที่โรงพยาบาลกำหนด",
  },
  {
    title: "ลบ/ทำลาย/ทำให้ระบุตัวไม่ได้",
    icon: "🗑️",
    detail: "เมื่อหมดวัตถุประสงค์หรือครบระยะเวลาตามกฎหมาย ให้ทำลายหรือทำให้ไม่สามารถระบุตัวตนได้",
  },
];

const destructionCases = [
  {
    title: "เอกสารกระดาษที่มีข้อมูลส่วนบุคคล",
    correct: "ฉีกอย่างละเอียดหรือใช้เครื่องทำลายเอกสารจนไม่สามารถระบุตัวตนได้",
    wrong: "ทิ้งลงถังขยะทั่วไปทันที",
  },
  {
    title: "สติกเกอร์ผู้ป่วยบนขวดน้ำเกลือหรือเวชภัณฑ์",
    correct: "ฉีก ขีดฆ่า หรือทำให้ไม่สามารถระบุตัวตนก่อนคัดแยกขยะ",
    wrong: "ทิ้งโดยยังอ่านชื่อหรือข้อมูลผู้ป่วยได้",
  },
  {
    title: "เวชระเบียนผู้ป่วยนอกที่ขาดการติดต่อเกิน 5 ปี",
    correct: "คัดแยก จัดทำบัญชีขอทำลาย เสนอผู้อำนวยการอนุมัติ แล้วทำลายอย่างปลอดภัย",
    wrong: "ทำลายเองทันทีโดยไม่มีบัญชีและไม่มีหลักฐาน",
  },
  {
    title: "เอกสารการเงิน/พัสดุที่ไม่มีแนวทางเฉพาะ",
    correct: "เก็บไว้ 10 ปีนับตั้งแต่เสร็จเรื่อง แล้วจัดทำบัญชีขอทำลายเพื่ออนุมัติ",
    wrong: "ทำลายเมื่อใดก็ได้ตามความสะดวกของหน่วยงาน",
  },
];

const locations = [
  "หน่วยเวชระเบียน ชั้น 1 อาคารศูนย์การแพทย์ฯ",
  "งานรังสีวิทยา ชั้น 1 อาคารพิเคราะห์บำบัดโรค",
  "งานการเงิน บัญชี และงบประมาณ ชั้น 3 อาคารศูนย์การแพทย์ฯ",
  "งานพยาธิวิทยาคลินิก ชั้น 3 อาคารศูนย์การแพทย์ฯ",
  "ห้องถ่ายเอกสารสำนักงาน ชั้น 4 อาคารสนับสนุนบริการ",
  "ฝ่ายพัสดุ ชั้น 14 อาคารสำนักวิชาแพทยศาสตร์",
  "จุดบริการอื่น ๆ ตามที่โรงพยาบาลกำหนด",
];

function SectionHeader({ tag, title, subtitle }) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center">
      <div className="mb-3 inline-flex rounded-full bg-red-900/10 px-4 py-2 text-sm font-bold text-red-900">
        ✨ {tag}
      </div>
      <h2 className="text-3xl font-black text-slate-900 md:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-7 text-slate-600">{subtitle}</p>
    </div>
  );
}

function Hero() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-red-50 px-5 py-16 md:px-8 md:py-24">
      <div className="absolute left-10 top-16 hidden animate-bounce rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-red-900 shadow-lg md:block">
        Privacy Notice
      </div>
      <div className="absolute right-10 top-24 hidden animate-pulse rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-slate-700 shadow-lg md:block">
        Secure Hospital Data
      </div>
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div>
          <div className="mb-5 inline-flex rounded-full border border-red-900/10 bg-white px-4 py-2 text-sm font-bold text-red-900 shadow-sm">
            🏥 MFU Medical Center Hospital PDPA Learning
          </div>
          <h1 className="text-4xl font-black leading-tight text-slate-950 md:text-6xl">
            เรียนรู้การคุ้มครองข้อมูลส่วนบุคคล
            <span className="block bg-gradient-to-r from-red-900 to-amber-700 bg-clip-text text-transparent">
              แบบ Interactive
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
            เว็บไซต์ต้นแบบสำหรับบุคลากรโรงพยาบาล เพื่อเรียนรู้ประเภทข้อมูลส่วนบุคคล วงจรการจัดการข้อมูล การเก็บรักษา และการทำลายเอกสารอย่างปลอดภัย
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
            เอกสารอ้างอิง: QP-PDPA-001-01
          </p>
          <a href="#learn" className="mt-8 inline-flex rounded-2xl bg-red-900 px-6 py-3 font-bold text-white shadow-lg">
            เริ่มเรียนรู้ →
          </a>
        </div>
        <div className="rounded-[2rem] bg-white p-6 shadow-2xl">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-red-950 to-slate-900 p-8 text-white">
            <div className="mx-auto flex h-36 w-36 animate-pulse items-center justify-center rounded-[2rem] bg-white/10 text-7xl">
              🛡️
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {['เก็บเท่าที่จำเป็น', 'ใช้ตามวัตถุประสงค์', 'รักษาความลับ', 'ทำลายปลอดภัย'].map((item) => (
                <div key={item} className="rounded-2xl bg-white/10 p-4 text-center text-sm font-bold">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function DataExplorer() {
  const [active, setActive] = useState(0);
  const item = dataTypes[active];

  return (
    <section id="learn" className="px-5 py-14 md:px-8">
      <SectionHeader
        tag="Interactive 01"
        title="สำรวจประเภทข้อมูลส่วนบุคคล"
        subtitle="คลิกการ์ดด้านขวาเพื่อดูตัวอย่างข้อมูลแต่ละประเภทที่พบได้ในบริบทโรงพยาบาล"
      />
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className={`rounded-[2rem] bg-gradient-to-br ${item.color} p-7 shadow-xl`}>
          <div className="mb-5 text-6xl">{item.icon}</div>
          <h3 className="text-2xl font-black text-slate-900">{item.title}</h3>
          <p className="mt-4 rounded-2xl bg-white/75 p-5 text-lg leading-8 text-slate-700 shadow-sm">
            {item.examples}
          </p>
          <p className="mt-5 rounded-2xl bg-red-900/10 p-4 text-sm font-semibold leading-7 text-red-950">
            ⚠️ หลักสำคัญ: เก็บเท่าที่จำเป็น ใช้เท่าที่มีวัตถุประสงค์ และจำกัดการเข้าถึงเฉพาะผู้เกี่ยวข้อง
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {dataTypes.map((d, index) => (
            <button
              key={d.title}
              onClick={() => setActive(index)}
              className={`rounded-3xl border p-5 text-left shadow-sm transition hover:-translate-y-1 ${
                active === index
                  ? 'border-red-900 bg-red-900 text-white shadow-xl'
                  : 'border-slate-200 bg-white hover:bg-red-50'
              }`}
            >
              <div className="text-3xl">{d.icon}</div>
              <div className="mt-3 font-black">{d.title}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Lifecycle() {
  const [step, setStep] = useState(0);
  const progress = ((step + 1) / lifecycle.length) * 100;

  return (
    <section className="bg-gradient-to-b from-white to-amber-50 px-5 py-14 md:px-8">
      <SectionHeader
        tag="Interactive 02"
        title="วงจรชีวิตข้อมูลส่วนบุคคล"
        subtitle="กดขั้นตอนเพื่อดูการจัดการข้อมูลตั้งแต่เก็บรวบรวมจนถึงทำลายหรือทำให้ระบุตัวไม่ได้"
      />
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-white p-6 shadow-xl">
        <div className="mb-8 h-4 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-red-900 via-amber-600 to-emerald-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-5">
          {lifecycle.map((item, index) => (
            <button
              key={item.title}
              onClick={() => setStep(index)}
              className={`rounded-3xl border p-5 text-left transition hover:-translate-y-1 ${
                step === index ? 'border-red-900 bg-red-900 text-white shadow-lg' : 'border-slate-200 bg-white hover:bg-amber-50'
              }`}
            >
              <div className="text-4xl">{item.icon}</div>
              <div className="mt-3 text-xs font-bold opacity-70">STEP {index + 1}</div>
              <div className="mt-1 font-black leading-snug">{item.title}</div>
            </button>
          ))}
        </div>
        <div className="mt-8 rounded-3xl bg-slate-50 p-6">
          <h3 className="text-2xl font-black text-slate-900">{lifecycle[step].icon} {lifecycle[step].title}</h3>
          <p className="mt-3 text-lg leading-8 text-slate-700">{lifecycle[step].detail}</p>
          <button
            onClick={() => setStep((step + 1) % lifecycle.length)}
            className="mt-5 rounded-2xl bg-red-900 px-5 py-3 font-bold text-white shadow-lg"
          >
            ขั้นต่อไป →
          </button>
        </div>
      </div>
    </section>
  );
}

function DestructionGame() {
  const [answers, setAnswers] = useState({});
  const score = useMemo(() => Object.values(answers).filter(Boolean).length, [answers]);

  return (
    <section className="px-5 py-14 md:px-8">
      <SectionHeader
        tag="Interactive 03"
        title="เกมเลือกวิธีทำลายเอกสาร"
        subtitle="เลือกแนวทางที่ถูกต้องในแต่ละสถานการณ์ เพื่อฝึกการจัดการเอกสารที่มีข้อมูลส่วนบุคคล"
      />
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between rounded-3xl bg-slate-900 p-5 text-white">
          <div>
            <div className="text-sm text-white/70">คะแนน</div>
            <div className="text-3xl font-black">{score}/{destructionCases.length}</div>
          </div>
          <button onClick={() => setAnswers({})} className="rounded-2xl bg-white/10 px-4 py-2 font-bold hover:bg-white/20">
            ↻ เริ่มใหม่
          </button>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {destructionCases.map((c, index) => {
            const status = answers[index];
            return (
              <div key={c.title} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-black leading-7 text-slate-900">📄 {c.title}</h3>
                {status === true && <p className="mt-2 font-bold text-emerald-700">✓ ถูกต้องแล้ว</p>}
                {status === false && <p className="mt-2 font-bold text-red-700">✕ ยังไม่ถูก ลองเลือกอีกครั้ง</p>}
                <div className="mt-4 grid gap-3">
                  <button
                    onClick={() => setAnswers({ ...answers, [index]: true })}
                    className={`rounded-2xl border p-4 text-left leading-7 transition ${status === true ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:bg-emerald-50'}`}
                  >
                    {c.correct}
                  </button>
                  <button
                    onClick={() => setAnswers({ ...answers, [index]: false })}
                    className={`rounded-2xl border p-4 text-left leading-7 transition ${status === false ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:bg-red-50'}`}
                  >
                    {c.wrong}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const [active, setActive] = useState('opd');
  const cards = {
    opd: {
      label: 'OPD',
      title: 'เวชระเบียนผู้ป่วยนอก',
      year: 'ขาดการติดต่อเกิน 5 ปี',
      note: 'คัดแยกและจัดทำบัญชีขอทำลาย เสนอผู้อำนวยการโรงพยาบาลฯ พิจารณาอนุมัติ',
    },
    ipd: {
      label: 'IPD',
      title: 'เวชระเบียนผู้ป่วยใน',
      year: 'ขาดการติดต่อเกิน 10 ปี',
      note: 'หลังอนุมัติ ให้ทำลายด้วยเครื่องทำลายเอกสารหรือวิธีอื่นที่ทำให้ระบุตัวตนไม่ได้',
    },
    finance: {
      label: 'Finance / Procurement',
      title: 'เอกสารการเงินและพัสดุ',
      year: 'เก็บ 10 ปีนับตั้งแต่เสร็จเรื่อง หากไม่มีแนวทางเฉพาะ',
      note: 'เมื่อครบกำหนด ให้จัดทำบัญชีขอทำลายและเก็บบัญชีไว้เป็นหลักฐานในการตรวจสอบ',
    },
  };
  const current = cards[active];

  return (
    <section className="bg-gradient-to-b from-amber-50 to-white px-5 py-14 md:px-8">
      <SectionHeader
        tag="Interactive 04"
        title="Retention Timeline"
        subtitle="เลือกประเภทเอกสารเพื่อดูระยะเวลาและเงื่อนไขก่อนเข้าสู่กระบวนการทำลาย"
      />
      <div className="mx-auto max-w-5xl rounded-[2rem] bg-white p-6 shadow-xl">
        <div className="mb-6 flex flex-wrap gap-3">
          {Object.keys(cards).map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`rounded-full px-5 py-3 font-bold transition ${active === key ? 'bg-red-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-red-50'}`}
            >
              {cards[key].label}
            </button>
          ))}
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-red-950 to-slate-900 p-7 text-white">
          <div className="text-sm font-bold uppercase tracking-widest text-amber-200">{current.label}</div>
          <h3 className="mt-2 text-3xl font-black">{current.title}</h3>
          <p className="mt-4 text-2xl font-black text-amber-100">{current.year}</p>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/80">{current.note}</p>
        </div>
      </div>
    </section>
  );
}

function DpoAndLocations() {
  return (
    <section className="px-5 py-14 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] bg-white p-6 shadow-xl">
          <div className="mb-4 inline-flex rounded-full bg-red-900/10 px-4 py-2 text-sm font-bold text-red-900">
            🗑️ จุดบริการเครื่องทำลายเอกสาร
          </div>
          <h2 className="text-2xl font-black text-slate-900">จุดที่ระบุในระเบียบวิธีดำเนินงาน</h2>
          <div className="mt-6 grid gap-3">
            {locations.map((loc, index) => (
              <div key={loc} className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-900 text-sm font-black text-white">
                  {index + 1}
                </div>
                <p className="leading-7 text-slate-700">{loc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] bg-gradient-to-br from-red-950 to-amber-900 p-6 text-white shadow-xl">
          <div className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold">🛡️ DPO Contact Card</div>
          <h2 className="text-3xl font-black">เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล</h2>
          <p className="mt-4 leading-8 text-white/80">
            ติดต่อเพื่อขอคำแนะนำ ตรวจสอบการดำเนินงาน และประสานงานด้านการคุ้มครองข้อมูลส่วนบุคคลของโรงพยาบาลฯ
          </p>
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-white/10 p-4 leading-7">📍 โรงพยาบาลศูนย์การแพทย์มหาวิทยาลัยแม่ฟ้าหลวง 365 หมู่ 12 ต.นางแล อ.เมืองเชียงราย จ.เชียงราย 57100</div>
            <div className="rounded-2xl bg-white/10 p-4">✉️ pdpa.mch@mfu.ac.th</div>
            <div className="rounded-2xl bg-white/10 p-4">☎️ 053-914-175</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#fffaf0] text-slate-900">
      <Hero />
      <DataExplorer />
      <Lifecycle />
      <DestructionGame />
      <Timeline />
      <DpoAndLocations />
      <footer className="border-t border-slate-200 bg-white px-5 py-8 text-center text-sm leading-7 text-slate-500">
        Prototype based on QP-PDPA-001-01: การคุ้มครองข้อมูลส่วนบุคคล โรงพยาบาลศูนย์การแพทย์มหาวิทยาลัยแม่ฟ้าหลวง
      </footer>
    </div>
  );
}
