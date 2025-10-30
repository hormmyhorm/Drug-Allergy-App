import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, AlertCircle, CheckCircle, Clock, Calculator } from 'lucide-react';

const DrugAllergyAssessment = () => {
  const [currentPage, setCurrentPage] = useState(0);
  
  const [patientData, setPatientData] = useState({
    name: '', hn: '', age: '', weight: '', hospital: '', insurance: ''
  });

  const [symptomTiming, setSymptomTiming] = useState('');
  const [symptomTimingOther, setSymptomTimingOther] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  // Page 2: Other Systems Data
  const [otherSystemsData, setOtherSystemsData] = useState({
    respiratory: [],
    respiratoryDetails: {},
    cardiovascular: [],
    cardiovascularDetails: {},
    gastrointestinal: [],
    gastrointestinalDetails: {},
    musculoskeletal: [],
    musculoskeletalDetails: {},
    vision: [],
    visionDetails: {},
    urinary: [],
    urinaryDetails: {},
    skinAdditional: [],
    skinAdditionalDetails: {},
    entNose: [],
    entNoseDetails: {},
    other: [],
    otherDetails: {},
    organInvolvement: [],
    organInvolvementDetails: {}
  });

  // Page 3: Lab Results Data
  const [labData, setLabData] = useState({
    cbc: {
      wbc: { checked: false, value: '', detail: '' },
      aec: { checked: false, value: '', detail: '' },
      neutrophil: { checked: false, value: '', detail: '' },
      lymphocyte: { checked: false, value: '', detail: '' },
      atypicalLymphocytes: { checked: false, value: '', detail: '' },
      eosinophil: { checked: false, value: '', detail: '' },
      hemoglobin: { checked: false, value: '', detail: '' },
      platelet: { checked: false, value: '', detail: '' }
    },
    lft: {
      ast: { checked: false, value: '', detail: '' },
      alt: { checked: false, value: '', detail: '' },
      alp: { checked: false, value: '', detail: '' },
      totalBilirubin: { checked: false, value: '', detail: '' },
      directBilirubin: { checked: false, value: '', detail: '' }
    },
    rft: {
      bun: { checked: false, value: '', detail: '' },
      creatinine: { checked: false, value: '', detail: '' },
      egfr: { checked: false, value: '', detail: '' },
      uo: { checked: false, value: '', detail: '' }
    },
    electrolytes: {
      na: { checked: false, value: '', detail: '' },
      k: { checked: false, value: '', detail: '' },
      cl: { checked: false, value: '', detail: '' },
      hco3: { checked: false, value: '', detail: '' },
      ca: { checked: false, value: '', detail: '' },
      mg: { checked: false, value: '', detail: '' },
      phosphate: { checked: false, value: '', detail: '' }
    },
    urinalysis: {
      protein: { checked: false, value: '', detail: '' },
      bloodRbc: { checked: false, value: '', detail: '' },
      wbc: { checked: false, value: '', detail: '' },
      nitrite: { checked: false, value: '', detail: '' },
      leukocyteEsterase: { checked: false, value: '', detail: '' },
      specificGravity: { checked: false, value: '', detail: '' },
      ph: { checked: false, value: '', detail: '' },
      glucose: { checked: false, value: '', detail: '' },
      ketone: { checked: false, value: '', detail: '' }
    },
    lung: {
      spo2: { checked: false, value: '', detail: '' },
      lungFunction: { checked: false, value: '', detail: '' }
    },
    cardiac: {
      troponinI: { checked: false, value: '', detail: '' },
      troponinT: { checked: false, value: '', detail: '' },
      ckMb: { checked: false, value: '', detail: '' },
      ekg: { checked: false, value: '', detail: '' }
    },
    immunology: {
      ige: { checked: false, value: '', detail: '' },
      complement: { checked: false, value: '', detail: '' }
    }
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearAllData = () => {
    setPatientData({ name: '', hn: '', age: '', weight: '', hospital: '', insurance: '' });
    setSkinData({
      rashShape: [], rashShapeDetail: '', rashShapeOther: '',
      rashColor: [], rashColorOther: '',
      smallBlisters: false, smallBlistersCount: '',
      mediumBlisters: false, mediumBlistersCount: '',
      largeBlisters: false, largeBlistersCount: '',
      skinPeeling: [], skinPeelingOther: '',
      dryness: [], drynessOther: '',
      discharge: [], dischargeDetail: '', crustDetail: '',
      itching: null, itchingSeverity: null,
      pain: [], swelling: null, swellingSize: '',
      pustules: null, pustulesDetail: '',
      location: [], distribution: '', distributionOther: ''
    });
    setOtherSystemsData({
      respiratory: [], respiratoryDetails: {},
      cardiovascular: [], cardiovascularDetails: {},
      gastrointestinal: [], gastrointestinalDetails: {},
      musculoskeletal: [], musculoskeletalDetails: {},
      vision: [], visionDetails: {},
      urinary: [], urinaryDetails: {},
      skinAdditional: [], skinAdditionalDetails: {},
      entNose: [], entNoseDetails: {},
      other: [], otherDetails: {},
      organInvolvement: [], organInvolvementDetails: {}
    });
    setLabData({
      cbc: {
        wbc: { checked: false, value: '', detail: '' },
        aec: { checked: false, value: '', detail: '' },
        neutrophil: { checked: false, value: '', detail: '' },
        lymphocyte: { checked: false, value: '', detail: '' },
        atypicalLymphocytes: { checked: false, value: '', detail: '' },
        eosinophil: { checked: false, value: '', detail: '' },
        hemoglobin: { checked: false, value: '', detail: '' },
        platelet: { checked: false, value: '', detail: '' }
      },
      lft: {
        ast: { checked: false, value: '', detail: '' },
        alt: { checked: false, value: '', detail: '' },
        alp: { checked: false, value: '', detail: '' },
        totalBilirubin: { checked: false, value: '', detail: '' },
        directBilirubin: { checked: false, value: '', detail: '' }
      },
      rft: {
        bun: { checked: false, value: '', detail: '' },
        creatinine: { checked: false, value: '', detail: '' },
        egfr: { checked: false, value: '', detail: '' },
        uo: { checked: false, value: '', detail: '' }
      },
      electrolytes: {
        na: { checked: false, value: '', detail: '' },
        k: { checked: false, value: '', detail: '' },
        cl: { checked: false, value: '', detail: '' },
        hco3: { checked: false, value: '', detail: '' },
        ca: { checked: false, value: '', detail: '' },
        mg: { checked: false, value: '', detail: '' },
        phosphate: { checked: false, value: '', detail: '' }
      },
      urinalysis: {
        protein: { checked: false, value: '', detail: '' },
        bloodRbc: { checked: false, value: '', detail: '' },
        wbc: { checked: false, value: '', detail: '' },
        nitrite: { checked: false, value: '', detail: '' },
        leukocyteEsterase: { checked: false, value: '', detail: '' },
        specificGravity: { checked: false, value: '', detail: '' },
        ph: { checked: false, value: '', detail: '' },
        glucose: { checked: false, value: '', detail: '' },
        ketone: { checked: false, value: '', detail: '' }
      },
      lung: {
        spo2: { checked: false, value: '', detail: '' },
        lungFunction: { checked: false, value: '', detail: '' }
      },
      cardiac: {
        troponinI: { checked: false, value: '', detail: '' },
        troponinT: { checked: false, value: '', detail: '' },
        ckMb: { checked: false, value: '', detail: '' },
        ekg: { checked: false, value: '', detail: '' }
      },
      immunology: {
        ige: { checked: false, value: '', detail: '' },
        complement: { checked: false, value: '', detail: '' }
      }
    });
    setSymptomTiming('');
    setSymptomTimingOther('');
    setUploadedImage(null);
    setNaranjoAssessments([
      {
        id: 1,
        drugName: '',
        answers: { 
          q1: { type: null, value: null }, 
          q2: { type: null, value: null }, 
          q3: { type: null, value: null }, 
          q4: { type: null, value: null }, 
          q5: { type: null, value: null }, 
          q6: { type: null, value: null }, 
          q7: { type: null, value: null }, 
          q8: { type: null, value: null }, 
          q9: { type: null, value: null }, 
          q10: { type: null, value: null } 
        }
      }
    ]);
    setTimelineEvents([
      {
        id: 1,
        drugName: '',
        color: '#3B82F6',
        events: [
          { type: 'drug_start', date: '', time: '', label: 'เริ่มให้ยา' },
          { type: 'drug_stop', date: '', time: '', label: 'หยุดยา' }
        ]
      }
    ]);
    setAdrEvents([
      {
        id: 1,
        symptom: '',
        date: '',
        time: '',
        resolveDate: '',
        resolveTime: ''
      }
    ]);
    setShowTimeline(false);
  };

  const clearPage0Data = () => {
    setPatientData({ name: '', hn: '', age: '', weight: '', hospital: '', insurance: '' });
  };

  const clearPage1Data = () => {
    setSymptomTiming('');
    setSymptomTimingOther('');
    setUploadedImage(null);
    setSkinData({
      rashShape: [], rashShapeDetail: '', rashShapeOther: '',
      rashColor: [], rashColorOther: '',
      smallBlisters: false, smallBlistersCount: '',
      mediumBlisters: false, mediumBlistersCount: '',
      largeBlisters: false, largeBlistersCount: '',
      skinPeeling: [], skinPeelingOther: '',
      dryness: [], drynessOther: '',
      discharge: [], dischargeDetail: '', crustDetail: '',
      itching: null, itchingSeverity: null,
      pain: [], swelling: null, swellingSize: '',
      pustules: null, pustulesDetail: '',
      location: [], distribution: '', distributionOther: ''
    });
    setOtherSystemsData({
      respiratory: [], respiratoryDetails: {},
      cardiovascular: [], cardiovascularDetails: {},
      gastrointestinal: [], gastrointestinalDetails: {},
      musculoskeletal: [], musculoskeletalDetails: {},
      vision: [], visionDetails: {},
      urinary: [], urinaryDetails: {},
      skinAdditional: [], skinAdditionalDetails: {},
      entNose: [], entNoseDetails: {},
      other: [], otherDetails: {},
      organInvolvement: [], organInvolvementDetails: {}
    });
  };

  const clearPage2Data = () => {
    setLabData({
      cbc: {
        wbc: { checked: false, value: '', detail: '' },
        aec: { checked: false, value: '', detail: '' },
        neutrophil: { checked: false, value: '', detail: '' },
        lymphocyte: { checked: false, value: '', detail: '' },
        atypicalLymphocytes: { checked: false, value: '', detail: '' },
        eosinophil: { checked: false, value: '', detail: '' },
        hemoglobin: { checked: false, value: '', detail: '' },
        platelet: { checked: false, value: '', detail: '' }
      },
      lft: {
        ast: { checked: false, value: '', detail: '' },
        alt: { checked: false, value: '', detail: '' },
        alp: { checked: false, value: '', detail: '' },
        totalBilirubin: { checked: false, value: '', detail: '' },
        directBilirubin: { checked: false, value: '', detail: '' }
      },
      rft: {
        bun: { checked: false, value: '', detail: '' },
        creatinine: { checked: false, value: '', detail: '' },
        egfr: { checked: false, value: '', detail: '' },
        uo: { checked: false, value: '', detail: '' }
      },
      electrolytes: {
        na: { checked: false, value: '', detail: '' },
        k: { checked: false, value: '', detail: '' },
        cl: { checked: false, value: '', detail: '' },
        hco3: { checked: false, value: '', detail: '' },
        ca: { checked: false, value: '', detail: '' },
        mg: { checked: false, value: '', detail: '' },
        phosphate: { checked: false, value: '', detail: '' }
      },
      urinalysis: {
        protein: { checked: false, value: '', detail: '' },
        bloodRbc: { checked: false, value: '', detail: '' },
        wbc: { checked: false, value: '', detail: '' },
        nitrite: { checked: false, value: '', detail: '' },
        leukocyteEsterase: { checked: false, value: '', detail: '' },
        specificGravity: { checked: false, value: '', detail: '' },
        ph: { checked: false, value: '', detail: '' },
        glucose: { checked: false, value: '', detail: '' },
        ketone: { checked: false, value: '', detail: '' }
      },
      lung: {
        spo2: { checked: false, value: '', detail: '' },
        lungFunction: { checked: false, value: '', detail: '' }
      },
      cardiac: {
        troponinI: { checked: false, value: '', detail: '' },
        troponinT: { checked: false, value: '', detail: '' },
        ckMb: { checked: false, value: '', detail: '' },
        ekg: { checked: false, value: '', detail: '' }
      },
      immunology: {
        ige: { checked: false, value: '', detail: '' },
        complement: { checked: false, value: '', detail: '' }
      }
    });
  };

  const clearPage3Data = () => {
    setNaranjoAssessments([
      {
        id: 1,
        drugName: '',
        answers: { 
          q1: { type: null, value: null }, 
          q2: { type: null, value: null }, 
          q3: { type: null, value: null }, 
          q4: { type: null, value: null }, 
          q5: { type: null, value: null }, 
          q6: { type: null, value: null }, 
          q7: { type: null, value: null }, 
          q8: { type: null, value: null }, 
          q9: { type: null, value: null }, 
          q10: { type: null, value: null } 
        }
      }
    ]);
  };

  const clearPage4Data = () => {
    setTimelineEvents([
      {
        id: 1,
        drugName: '',
        color: '#3B82F6',
        events: [
          { type: 'drug_start', date: '', time: '', label: 'เริ่มให้ยา' },
          { type: 'drug_stop', date: '', time: '', label: 'หยุดยา' }
        ]
      }
    ]);
    setAdrEvents([
      {
        id: 1,
        symptom: '',
        date: '',
        time: '',
        resolveDate: '',
        resolveTime: ''
      }
    ]);
    setShowTimeline(false);
  };

  const saveAndNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const [naranjoAssessments, setNaranjoAssessments] = useState([
    {
      id: 1,
      drugName: '',
      answers: { 
        q1: { type: null, value: null }, 
        q2: { type: null, value: null }, 
        q3: { type: null, value: null }, 
        q4: { type: null, value: null }, 
        q5: { type: null, value: null }, 
        q6: { type: null, value: null }, 
        q7: { type: null, value: null }, 
        q8: { type: null, value: null }, 
        q9: { type: null, value: null }, 
        q10: { type: null, value: null } 
      }
    }
  ]);

  const [timelineEvents, setTimelineEvents] = useState([
    {
      id: 1,
      drugName: '',
      color: '#3B82F6',
      events: [
        { type: 'drug_start', date: '', time: '', label: 'เริ่มให้ยา' },
        { type: 'drug_stop', date: '', time: '', label: 'หยุดยา' }
      ]
    }
  ]);

  const [adrEvents, setAdrEvents] = useState([
    {
      id: 1,
      symptom: '',
      date: '',
      time: '',
      resolveDate: '',
      resolveTime: ''
    }
  ]);

  const [showTimeline, setShowTimeline] = useState(false);

  const drugColors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316', '#6366F1'];

  const addNewAdrEvent = () => {
    setAdrEvents([
      ...adrEvents,
      {
        id: adrEvents.length + 1,
        symptom: '',
        date: '',
        time: '',
        resolveDate: '',
        resolveTime: ''
      }
    ]);
  };

  const removeAdrEvent = (id) => {
    if (adrEvents.length > 1) {
      setAdrEvents(adrEvents.filter(item => item.id !== id));
    }
  };

  const updateAdrEvent = (id, field, value) => {
    setAdrEvents(adrEvents.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const addNewDrugTimeline = () => {
    setTimelineEvents([
      ...timelineEvents,
      {
        id: timelineEvents.length + 1,
        drugName: '',
        color: drugColors[timelineEvents.length % drugColors.length],
        events: [
          { type: 'drug_start', date: '', time: '', label: 'เริ่มให้ยา' },
          { type: 'drug_stop', date: '', time: '', label: 'หยุดยา' }
        ]
      }
    ]);
  };

  const removeDrugTimeline = (id) => {
    if (timelineEvents.length > 1) {
      setTimelineEvents(timelineEvents.filter(item => item.id !== id));
    }
  };

  const updateTimelineDrugName = (id, name) => {
    setTimelineEvents(timelineEvents.map(item =>
      item.id === id ? { ...item, drugName: name } : item
    ));
  };

  const updateTimelineEvent = (drugId, eventType, field, value) => {
    setTimelineEvents(timelineEvents.map(drug =>
      drug.id === drugId ? {
        ...drug,
        events: drug.events.map(event =>
          event.type === eventType ? { ...event, [field]: value } : event
        )
      } : drug
    ));
  };

  const getAllTimelineEvents = () => {
    const allEvents = [];
    timelineEvents.forEach(drug => {
      drug.events.forEach(event => {
        if (event.date) {
          const datetime = new Date(`${event.date}T${event.time || '00:00'}`);
          allEvents.push({
            ...event,
            drugName: drug.drugName,
            color: drug.color,
            datetime
          });
        }
      });
    });
    return allEvents.sort((a, b) => a.datetime - b.datetime);
  };

  const addNewDrugAssessment = () => {
    setNaranjoAssessments([
      ...naranjoAssessments,
      {
        id: naranjoAssessments.length + 1,
        drugName: '',
        answers: { 
          q1: { type: null, value: null }, 
          q2: { type: null, value: null }, 
          q3: { type: null, value: null }, 
          q4: { type: null, value: null }, 
          q5: { type: null, value: null }, 
          q6: { type: null, value: null }, 
          q7: { type: null, value: null }, 
          q8: { type: null, value: null }, 
          q9: { type: null, value: null }, 
          q10: { type: null, value: null } 
        }
      }
    ]);
  };

  const removeDrugAssessment = (id) => {
    if (naranjoAssessments.length > 1) {
      setNaranjoAssessments(naranjoAssessments.filter(item => item.id !== id));
    }
  };

  const updateDrugName = (id, name) => {
    setNaranjoAssessments(naranjoAssessments.map(item =>
      item.id === id ? { ...item, drugName: name } : item
    ));
  };

  const updateAnswer = (id, question, value) => {
    setNaranjoAssessments(naranjoAssessments.map(item =>
      item.id === id ? {
        ...item,
        answers: { ...item.answers, [question]: value }
      } : item
    ));
  };

  const calculateScore = (answers) => {
    return Object.values(answers).reduce((sum, answer) => {
      return sum + (answer?.value || 0);
    }, 0);
  };

  const getInterpretation = (score) => {
    if (score >= 9) return { level: 'แน่นอน (Definite)', color: 'text-red-600', bg: 'bg-red-50' };
    if (score >= 5) return { level: 'น่าจะเป็น (Probable)', color: 'text-orange-600', bg: 'bg-orange-50' };
    if (score >= 1) return { level: 'เป็นไปได้ (Possible)', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'ไม่น่าจะเป็น (Doubtful)', color: 'text-gray-600', bg: 'bg-gray-50' };
  };

  const naranjoQuestions = [
    { q: '1. มีรายงานการแพ้ยานี้มาก่อนหรือไม่?', yes: 1, no: 0, unknown: 0 },
    { q: '2. อาการเกิดขึ้นหลังให้ยาหรือไม่?', yes: 2, no: -1, unknown: 0 },
    { q: '3. อาการดีขึ้นเมื่อหยุดยาหรือให้ยาต้านแพ้หรือไม่?', yes: 1, no: 0, unknown: 0 },
    { q: '4. อาการเกิดซ้ำเมื่อให้ยาอีกครั้งหรือไม่?', yes: 2, no: -1, unknown: 0 },
    { q: '5. มีสาเหตุอื่นที่อาจทำให้เกิดอาการนี้หรือไม่?', yes: -1, no: 2, unknown: 0 },
    { q: '6. อาการเกิดขึ้นเมื่อให้ยาหลอกหรือไม่?', yes: -1, no: 1, unknown: 0 },
    { q: '7. พบยาในเลือดหรือของเหลวในร่างกายหรือไม่?', yes: 1, no: 0, unknown: 0 },
    { q: '8. อาการรุนแรงขึ้นเมื่อเพิ่มขนาดยาหรือไม่?', yes: 1, no: 0, unknown: 0 },
    { q: '9. ผู้ป่วยเคยมีอาการคล้ายกันกับยาตัวเดียวกันหรือคล้ายกันหรือไม่?', yes: 1, no: 0, unknown: 0 },
    { q: '10. มีการยืนยันด้วยวิธีการทางวัตถุประสงค์หรือไม่?', yes: 1, no: 0, unknown: 0 }
  ];

  const [skinData, setSkinData] = useState({
    rashShape: [],
    rashShapeDetail: '',
    rashShapeOther: '',
    rashColor: [],
    rashColorOther: '',
    smallBlisters: false,
    smallBlistersCount: '',
    mediumBlisters: false,
    mediumBlistersCount: '',
    largeBlisters: false,
    largeBlistersCount: '',
    skinPeeling: [],
    skinPeelingOther: '',
    dryness: [],
    drynessOther: '',
    discharge: [],
    dischargeDetail: '',
    crustDetail: '',
    itching: null,
    itchingSeverity: null,
    pain: [],
    swelling: null,
    swellingSize: '',
    pustules: null,
    pustulesDetail: '',
    location: [],
    distribution: '',
    distributionOther: ''
  });

  const rashShapeOptions = ['ตุ่มนูน', 'ตุ่มแบนราบ', 'ปื้นนูน', 'วงกลมชั้นเดียว', 'วงกลม 3 ชั้น', 'วงรี', 'ขอบหยัก', 'ขอบเรียบ', 'ขอบไม่ชัดเจน', 'จุดเล็ก', 'จ้ำเลือด'];
  const rashColorOptions = ['แดง', 'แดงไหม้', 'แดงซีด', 'ซีด', 'ใส', 'ม่วง', 'เหลือง', 'มันเงา', 'ดำ', 'เทา'];
  const locationOptions = ['ทั่วร่างกาย', 'ศีรษะ', 'มือ', 'เท้า', 'หน้า', 'แขน', 'ขา', 'อวัยวะเพศ', 'ริมฝีปาก', 'รอบดวงตา', 'จมูก', 'ลำคอ', 'รักแร้', 'ขาหนีบ', 'หน้าอก', 'หลัง', 'ทวาร'];

  const toggleArrayItem = (array, item) => {
    if (array.includes(item)) {
      return array.filter(i => i !== item);
    } else {
      return [...array, item];
    }
  };

  const tabs = [
    { id: 0, label: 'หน้า 1 ระบบผิวหนัง' },
    { id: 1, label: 'หน้า 2 ระบบอื่นๆ' },
    { id: 2, label: 'หน้า 3 ผล Lab' },
    { id: 3, label: 'หน้า 4 Naranjo\'s algorithm' },
    { id: 4, label: 'หน้า 5 Timeline ประเมินการแพ้ยา' },
    { id: 5, label: 'หน้า 6 สรุปการประเมิน' }
  ];

  const renderPage = () => {
    if (currentPage === 0) {
      return (
        <div className="space-y-6 p-6">
          {/* ส่วนที่ 1: ข้อมูลผู้ป่วย */}
          <div className="bg-gradient-to-r from-orange-100 via-pink-100 to-purple-100 p-6 rounded-2xl border-2 border-orange-300 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">👤</span>
              <h3 className="text-2xl font-bold text-purple-800">ส่วนที่ 1 ข้อมูลผู้ป่วย</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อ-สกุล</label>
                <input
                  type="text"
                  placeholder="เช่น นางสาวเอ มี"
                  value={patientData.name}
                  onChange={(e) => setPatientData({...patientData, name: e.target.value})}
                  className="w-full p-3 border-2 border-pink-300 rounded-xl focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">HN</label>
                <input
                  type="text"
                  placeholder="เช่น 1234567"
                  value={patientData.hn}
                  onChange={(e) => setPatientData({...patientData, hn: e.target.value})}
                  className="w-full p-3 border-2 border-pink-300 rounded-xl focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">อายุ (ปี)</label>
                <input
                  type="number"
                  placeholder="เช่น 54"
                  value={patientData.age}
                  onChange={(e) => setPatientData({...patientData, age: e.target.value})}
                  className="w-full p-3 border-2 border-pink-300 rounded-xl focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">น้ำหนัก (กก.)</label>
                <input
                  type="number"
                  placeholder="เช่น 60"
                  value={patientData.weight}
                  onChange={(e) => setPatientData({...patientData, weight: e.target.value})}
                  className="w-full p-3 border-2 border-pink-300 rounded-xl focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">โรคประจำตัว</label>
                <input
                  type="text"
                  placeholder="เช่น เบาหวาน, ความดัน"
                  value={patientData.hospital}
                  onChange={(e) => setPatientData({...patientData, hospital: e.target.value})}
                  className="w-full p-3 border-2 border-pink-300 rounded-xl focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">ประวัติการแพ้ยา (กรุณาอธิบาย)</label>
                <textarea
                  placeholder="เช่น ผื่นลมพิษ หายใจลำบาก บวมหน้า — ระบุชื่อยา/ช่วงเวลาได้ยิ่งดี"
                  value={patientData.insurance}
                  onChange={(e) => setPatientData({...patientData, insurance: e.target.value})}
                  rows="3"
                  className="w-full p-3 border-2 border-pink-300 rounded-xl focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* ส่วนที่ 2: ประเมินอาการ */}
          <div className="bg-gradient-to-r from-blue-100 via-cyan-100 to-teal-100 p-6 rounded-2xl border-2 border-blue-300 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🔍</span>
              <h3 className="text-2xl font-bold text-blue-800">ส่วนที่ 2 ประเมินอาการ</h3>
            </div>

            {/* 1.1 รูปร่างผื่น */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-xl mb-4 shadow-md border-2 border-blue-200">
              <label className="block text-sm font-bold text-blue-800 mb-3">1.1 รูปร่างผื่น</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                {rashShapeOptions.map(option => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={skinData.rashShape.includes(option)}
                      onChange={() => setSkinData({...skinData, rashShape: toggleArrayItem(skinData.rashShape, option)})}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
              {skinData.rashShape.length > 0 && (
                <input
                  type="text"
                  placeholder="รายละเอียดเพิ่มเติม"
                  value={skinData.rashShapeDetail}
                  onChange={(e) => setSkinData({...skinData, rashShapeDetail: e.target.value})}
                  className="w-full p-2 border-2 border-blue-300 rounded-lg mb-2"
                />
              )}
              <input
                type="text"
                placeholder="อื่นๆ ระบุ..."
                value={skinData.rashShapeOther}
                onChange={(e) => setSkinData({...skinData, rashShapeOther: e.target.value})}
                className="w-full p-2 border-2 border-blue-300 rounded-lg"
              />
            </div>

            {/* 1.2 สีผื่น */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-xl mb-4 shadow-md border-2 border-blue-200">
              <label className="block text-sm font-bold text-blue-800 mb-3">1.2 สีผื่น</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                {rashColorOptions.map(option => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={skinData.rashColor.includes(option)}
                      onChange={() => setSkinData({...skinData, rashColor: toggleArrayItem(skinData.rashColor, option)})}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
              <input
                type="text"
                placeholder="อื่นๆ ระบุ..."
                value={skinData.rashColorOther}
                onChange={(e) => setSkinData({...skinData, rashColorOther: e.target.value})}
                className="w-full p-2 border-2 border-blue-300 rounded-lg"
              />
            </div>

            {/* 1.3 ตุ่มน้ำ */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-xl mb-4 shadow-md border-2 border-blue-200">
              <label className="block text-sm font-bold text-blue-800 mb-3">1.3 ตุ่มน้ำ</label>
              <div className="space-y-3">
                <div>
                  <label className="flex items-center gap-2 cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      checked={skinData.smallBlisters}
                      onChange={(e) => setSkinData({...skinData, smallBlisters: e.target.checked})}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">ตุ่มน้ำขนาดเล็ก</span>
                  </label>
                  {skinData.smallBlisters && (
                    <input
                      type="number"
                      placeholder="จำนวน"
                      value={skinData.smallBlistersCount}
                      onChange={(e) => setSkinData({...skinData, smallBlistersCount: e.target.value})}
                      className="w-full p-2 border-2 border-blue-300 rounded-lg"
                    />
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      checked={skinData.mediumBlisters}
                      onChange={(e) => setSkinData({...skinData, mediumBlisters: e.target.checked})}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">ตุ่มน้ำขนาดกลาง</span>
                  </label>
                  {skinData.mediumBlisters && (
                    <input
                      type="number"
                      placeholder="จำนวน"
                      value={skinData.mediumBlistersCount}
                      onChange={(e) => setSkinData({...skinData, mediumBlistersCount: e.target.value})}
                      className="w-full p-2 border-2 border-blue-300 rounded-lg"
                    />
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      checked={skinData.largeBlisters}
                      onChange={(e) => setSkinData({...skinData, largeBlisters: e.target.checked})}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">ตุ่มน้ำขนาดใหญ่</span>
                  </label>
                  {skinData.largeBlisters && (
                    <input
                      type="number"
                      placeholder="จำนวน"
                      value={skinData.largeBlistersCount}
                      onChange={(e) => setSkinData({...skinData, largeBlistersCount: e.target.value})}
                      className="w-full p-2 border-2 border-blue-300 rounded-lg"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* 1.4 ผิวหลุดลอก */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-xl mb-4 shadow-md border-2 border-blue-200">
              <label className="block text-sm font-bold text-blue-800 mb-3">1.4 ผิวหลุดลอก</label>
              <div className="grid grid-cols-1 gap-2">
                {['ผิวหนังหลุดลอกตรงกลางผื่น', 'ผิวหนังหลุดลอกไม่เกิน 10% ของ BSA', 'ผิวหนังหลุดลอกเกิน 30% ของ BSA', 'ไม่พบ'].map(option => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={skinData.skinPeeling.includes(option)}
                      onChange={() => setSkinData({...skinData, skinPeeling: toggleArrayItem(skinData.skinPeeling, option)})}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
              <input
                type="text"
                placeholder="อื่นๆ ระบุ..."
                value={skinData.skinPeelingOther}
                onChange={(e) => setSkinData({...skinData, skinPeelingOther: e.target.value})}
                className="w-full p-2 border-2 border-blue-300 rounded-lg mt-2"
              />
            </div>

            {/* 1.5 ขุย/แห้ง/ลอก */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-xl mb-4 shadow-md border-2 border-blue-200">
              <label className="block text-sm font-bold text-blue-800 mb-3">1.5 ขุย/แห้ง/ลอก</label>
              <div className="grid grid-cols-2 gap-2">
                {['ขุย', 'แห้ง', 'ลอก', 'ไม่พบ'].map(option => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={skinData.dryness.includes(option)}
                      onChange={() => setSkinData({...skinData, dryness: toggleArrayItem(skinData.dryness, option)})}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
              <input
                type="text"
                placeholder="อื่นๆ ระบุ..."
                value={skinData.drynessOther}
                onChange={(e) => setSkinData({...skinData, drynessOther: e.target.value})}
                className="w-full p-2 border-2 border-blue-300 rounded-lg mt-2"
              />
            </div>

            {/* 1.6 น้ำเหลือง/สะเก็ด */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-xl mb-4 shadow-md border-2 border-blue-200">
              <label className="block text-sm font-bold text-blue-800 mb-3">1.6 น้ำเหลือง/สะเก็ด</label>
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={skinData.discharge.includes('น้ำเหลือง')}
                    onChange={() => setSkinData({...skinData, discharge: toggleArrayItem(skinData.discharge, 'น้ำเหลือง')})}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-700">น้ำเหลือง</span>
                </label>
                {skinData.discharge.includes('น้ำเหลือง') && (
                  <input
                    type="text"
                    placeholder="ระบุรายละเอียด เช่น ปริมาณ สี"
                    value={skinData.dischargeDetail}
                    onChange={(e) => setSkinData({...skinData, dischargeDetail: e.target.value})}
                    className="w-full p-2 border-2 border-blue-300 rounded-lg ml-6"
                  />
                )}
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={skinData.discharge.includes('สะเก็ด')}
                    onChange={() => setSkinData({...skinData, discharge: toggleArrayItem(skinData.discharge, 'สะเก็ด')})}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-700">สะเก็ด</span>
                </label>
                {skinData.discharge.includes('สะเก็ด') && (
                  <input
                    type="text"
                    placeholder="ระบุรายละเอียด เช่น ปริมาณ สี"
                    value={skinData.crustDetail}
                    onChange={(e) => setSkinData({...skinData, crustDetail: e.target.value})}
                    className="w-full p-2 border-2 border-blue-300 rounded-lg ml-6"
                  />
                )}
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={skinData.discharge.includes('ไม่พบ')}
                    onChange={() => setSkinData({...skinData, discharge: toggleArrayItem(skinData.discharge, 'ไม่พบ')})}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-700">ไม่พบ</span>
                </label>
              </div>
            </div>

            {/* 1.7 คัน */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-xl mb-4 shadow-md border-2 border-blue-200">
              <label className="block text-sm font-bold text-blue-800 mb-3">1.7 คัน</label>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setSkinData({...skinData, itching: skinData.itching === 'คัน' ? null : 'คัน', itchingSeverity: null})}
                  className={`w-full p-4 rounded-lg font-medium text-left transition-all border-2 ${
                    skinData.itching === 'คัน'
                      ? 'bg-blue-500 text-white border-blue-600 shadow-lg'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  ☐ คัน {skinData.itching === 'คัน' && '✓'}
                </button>
                {skinData.itching === 'คัน' && (
                  <div className="ml-8 space-y-2">
                    <button
                      type="button"
                      onClick={() => setSkinData({...skinData, itchingSeverity: skinData.itchingSeverity === 'คันมาก' ? null : 'คันมาก'})}
                      className={`w-full p-3 rounded-lg font-medium text-left transition-all border-2 ${
                        skinData.itchingSeverity === 'คันมาก'
                          ? 'bg-red-500 text-white border-red-600 shadow-lg'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      ☐ คันมาก {skinData.itchingSeverity === 'คันมาก' && '✓'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSkinData({...skinData, itchingSeverity: skinData.itchingSeverity === 'คันน้อย' ? null : 'คันน้อย'})}
                      className={`w-full p-3 rounded-lg font-medium text-left transition-all border-2 ${
                        skinData.itchingSeverity === 'คันน้อย'
                          ? 'bg-yellow-500 text-white border-yellow-600 shadow-lg'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      ☐ คันน้อย {skinData.itchingSeverity === 'คันน้อย' && '✓'}
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setSkinData({...skinData, itching: skinData.itching === 'ไม่คัน' ? null : 'ไม่คัน', itchingSeverity: null})}
                  className={`w-full p-4 rounded-lg font-medium text-left transition-all border-2 ${
                    skinData.itching === 'ไม่คัน'
                      ? 'bg-green-500 text-white border-green-600 shadow-lg'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  ☐ ไม่คัน {skinData.itching === 'ไม่คัน' && '✓'}
                </button>
              </div>
            </div>

            {/* 1.8 ปวด/แสบ/เจ็บ */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-xl mb-4 shadow-md border-2 border-blue-200">
              <label className="block text-sm font-bold text-blue-800 mb-3">1.8 ปวด/แสบ/เจ็บ</label>
              <div className="grid grid-cols-2 gap-2">
                {['ปวด', 'แสบ', 'เจ็บ', 'ไม่พบ'].map(option => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={skinData.pain.includes(option)}
                      onChange={() => setSkinData({...skinData, pain: toggleArrayItem(skinData.pain, option)})}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 1.9 บวม */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-xl mb-4 shadow-md border-2 border-blue-200">
              <label className="block text-sm font-bold text-blue-800 mb-3">1.9 บวม</label>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setSkinData({...skinData, swelling: skinData.swelling === true ? null : true})}
                  className={`w-full p-4 rounded-lg font-medium text-left transition-all border-2 ${
                    skinData.swelling === true
                      ? 'bg-blue-500 text-white border-blue-600 shadow-lg'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  ☐ บวม {skinData.swelling === true && '✓'}
                </button>
                {skinData.swelling === true && (
                  <input
                    type="text"
                    placeholder="ระบุขนาด"
                    value={skinData.swellingSize}
                    onChange={(e) => setSkinData({...skinData, swellingSize: e.target.value})}
                    className="w-full p-3 ml-8 border-2 border-blue-300 rounded-lg"
                  />
                )}
                <button
                  type="button"
                  onClick={() => setSkinData({...skinData, swelling: skinData.swelling === false ? null : false, swellingSize: ''})}
                  className={`w-full p-4 rounded-lg font-medium text-left transition-all border-2 ${
                    skinData.swelling === false
                      ? 'bg-green-500 text-white border-green-600 shadow-lg'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  ☐ ไม่บวม {skinData.swelling === false && '✓'}
                </button>
              </div>
            </div>

            {/* 1.20 ตุ่มหนอง */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-xl mb-4 shadow-md border-2 border-blue-200">
              <label className="block text-sm font-bold text-blue-800 mb-3">1.20 ตุ่มหนอง</label>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setSkinData({...skinData, pustules: skinData.pustules === true ? null : true})}
                  className={`w-full p-4 rounded-lg font-medium text-left transition-all border-2 ${
                    skinData.pustules === true
                      ? 'bg-blue-500 text-white border-blue-600 shadow-lg'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  ☐ พบ {skinData.pustules === true && '✓'}
                </button>
                {skinData.pustules === true && (
                  <input
                    type="text"
                    placeholder="ระบุขนาดและจำนวน"
                    value={skinData.pustulesDetail}
                    onChange={(e) => setSkinData({...skinData, pustulesDetail: e.target.value})}
                    className="w-full p-3 ml-8 border-2 border-blue-300 rounded-lg"
                  />
                )}
                <button
                  type="button"
                  onClick={() => setSkinData({...skinData, pustules: skinData.pustules === false ? null : false, pustulesDetail: ''})}
                  className={`w-full p-4 rounded-lg font-medium text-left transition-all border-2 ${
                    skinData.pustules === false
                      ? 'bg-green-500 text-white border-green-600 shadow-lg'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  ☐ ไม่พบ {skinData.pustules === false && '✓'}
                </button>
              </div>
            </div>

            {/* 1.21 ตำแหน่งที่พบ/การกระจายตัว */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-xl shadow-md border-2 border-blue-200">
              <label className="block text-sm font-bold text-blue-800 mb-3">1.21 ตำแหน่งที่พบ/การกระจายตัว</label>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-600 mb-2">ตำแหน่งที่พบ:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {locationOptions.map(option => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={skinData.location.includes(option)}
                        onChange={() => setSkinData({...skinData, location: toggleArrayItem(skinData.location, option)})}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">การกระจายตัว:</p>
                <select
                  value={skinData.distribution}
                  onChange={(e) => setSkinData({...skinData, distribution: e.target.value})}
                  className="w-full p-2 border-2 border-blue-300 rounded-lg mb-2"
                >
                  <option value="">เลือก...</option>
                  <option value="สมมาตร">สมมาตร</option>
                  <option value="ไม่สมมาตร">ไม่สมมาตร</option>
                  <option value="อื่นๆ">อื่นๆ</option>
                </select>
                {skinData.distribution === 'อื่นๆ' && (
                  <input
                    type="text"
                    placeholder="ระบุ..."
                    value={skinData.distributionOther}
                    onChange={(e) => setSkinData({...skinData, distributionOther: e.target.value})}
                    className="w-full p-2 border-2 border-blue-300 rounded-lg"
                  />
                )}
              </div>
            </div>
          </div>

          {/* ส่วนที่ 3: ระยะเวลาการเกิดอาการ */}
          <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 p-6 rounded-2xl border-2 border-purple-300 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">⏱️</span>
              <h3 className="text-2xl font-bold text-purple-800">ส่วนที่ 3 ระยะเวลาการเกิดอาการ</h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                เลือกช่วงเวลาที่เริ่มเกิดอาการหลังได้รับยา:
              </label>
              <select
                value={symptomTiming}
                onChange={(e) => setSymptomTiming(e.target.value)}
                className="w-full p-3 border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
              >
                <option value="">เลือก...</option>
                <option value="ภายใน 1 ชั่วโมง">ภายใน 1 ชั่วโมง</option>
                <option value="ภายใน 1-6 ชั่วโมง">ภายใน 1-6 ชั่วโมง</option>
                <option value="ภายใน 6-24 ชั่วโมง">ภายใน 6-24 ชั่วโมง</option>
                <option value="ภายใน 1 สัปดาห์">ภายใน 1 สัปดาห์</option>
                <option value="ภายใน 2 สัปดาห์">ภายใน 2 สัปดาห์</option>
                <option value="ภายใน 3 สัปดาห์">ภายใน 3 สัปดาห์</option>
                <option value="ภายใน 4 สัปดาห์">ภายใน 4 สัปดาห์</option>
                <option value="ภายใน 5 สัปดาห์">ภายใน 5 สัปดาห์</option>
                <option value="ภายใน 6 สัปดาห์">ภายใน 6 สัปดาห์</option>
                <option value="อื่นๆ ระบุ...">อื่นๆ ระบุ...</option>
              </select>
              {symptomTiming === 'อื่นๆ ระบุ...' && (
                <input
                  type="text"
                  placeholder="กรุณาระบุระยะเวลา"
                  value={symptomTimingOther}
                  onChange={(e) => setSymptomTimingOther(e.target.value)}
                  className="w-full p-3 mt-3 border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:outline-none"
                />
              )}
            </div>
          </div>

          {/* ส่วนที่ 4: แนบรูปถ่ายอาการผู้ป่วย */}
          <div className="bg-gradient-to-r from-green-100 via-teal-100 to-cyan-100 p-6 rounded-2xl border-2 border-green-300 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🖼️</span>
              <h3 className="text-2xl font-bold text-green-800">ส่วนที่ 4 แนบรูปถ่ายอาการผู้ป่วย (ถ้ามี)</h3>
            </div>

            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-8 rounded-xl border-2 border-dashed border-green-300 text-center">
              {!uploadedImage ? (
                <>
                  <div className="mb-4">
                    <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-5xl">🖼️</span>
                    </div>
                    <h4 className="text-xl font-bold text-purple-700 mb-2">อัปโหลดรูปภาพ</h4>
                    <p className="text-gray-600 mb-4">หรือ ลากและวาง • PNG, JPG, GIF</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition-all"
                  >
                    เลือกไฟล์
                  </label>
                </>
              ) : (
                <div>
                  <img src={uploadedImage} alt="Uploaded" className="max-w-full max-h-96 mx-auto rounded-lg mb-4" />
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                  >
                    ลบรูปภาพ
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ปุ่มล้างข้อมูล และ บันทึกไปหน้า 2 */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={clearPage0Data}
              className="px-8 py-4 bg-red-500 text-white border-2 border-red-600 rounded-xl font-bold hover:bg-red-600 transition-all shadow-md"
            >
              🗑️ ล้างข้อมูลหน้านี้
            </button>
            <button
              onClick={saveAndNext}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
            >
              บันทึกข้อมูลและไปหน้า 2
            </button>
          </div>
        </div>
      );
    }

    if (currentPage === 1) {
      const renderSymptomCheckbox = (system, symptom) => {
        const isChecked = otherSystemsData[system].includes(symptom);
        const detailValue = otherSystemsData[`${system}Details`]?.[symptom] || '';
        
        return (
          <div key={symptom} className="bg-gray-50 p-3 rounded-lg">
            <label className="flex items-center gap-2 cursor-pointer mb-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {
                  const newArray = toggleArrayItem(otherSystemsData[system], symptom);
                  setOtherSystemsData({
                    ...otherSystemsData,
                    [system]: newArray
                  });
                }}
                className="w-4 h-4 text-rose-600 rounded"
              />
              <span className="text-sm text-gray-700 font-medium">{symptom}</span>
            </label>
            {isChecked && (
              <input
                type="text"
                placeholder="ระบุรายละเอียดเพิ่มเติม..."
                value={detailValue}
                onChange={(e) => {
                  setOtherSystemsData({
                    ...otherSystemsData,
                    [`${system}Details`]: {
                      ...otherSystemsData[`${system}Details`],
                      [symptom]: e.target.value
                    }
                  });
                }}
                className="w-full p-2 border-2 border-rose-300 rounded-lg mt-2 text-sm"
              />
            )}
          </div>
        );
      };

      return (
        <div className="space-y-6 p-6">
          <div className="bg-gradient-to-r from-rose-100 via-orange-100 to-amber-100 p-6 rounded-2xl border-2 border-rose-300 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl">🫁</span>
              <h3 className="text-2xl font-bold text-rose-800">ส่วนที่ 1 อาการและอาการแสดงระบบอื่นๆ</h3>
            </div>

            {/* 1. ระบบหายใจ */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-xl mb-4 shadow-md border-2 border-rose-200">
              <label className="block text-sm font-bold text-rose-800 mb-3">1. ระบบหายใจ</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['เจ็บคอ', 'หายใจมีเสียงวี๊ด', 'หอบเหนื่อย/หายใจลำบาก (RR>21 หรือ HR>100 หรือ SpO2<94%)', 'ไอ', 'มีเสมหะ', 'ไอเป็นเลือด', 'ถุงลมเลือดออก', 'ไม่พบ'].map(symptom => 
                  renderSymptomCheckbox('respiratory', symptom)
                )}
              </div>
            </div>

            {/* 2. ระบบไหลเวียนโลหิต */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-xl mb-4 shadow-md border-2 border-rose-200">
              <label className="block text-sm font-bold text-rose-800 mb-3">2. ระบบไหลเวียนโลหิต</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['เจ็บหน้าอก', 'ใจสั่น', 'BP ต่ำ (<90/60)', 'HR สูง (>100)', 'หน้ามืด/หมดสติ', 'โลหิตจาง', 'ซีด', 'ไม่พบ'].map(symptom => 
                  renderSymptomCheckbox('cardiovascular', symptom)
                )}
              </div>
            </div>

            {/* 3. ระบบทางเดินอาหาร */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-xl mb-4 shadow-md border-2 border-rose-200">
              <label className="block text-sm font-bold text-rose-800 mb-3">3. ระบบทางเดินอาหาร</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['คลื่นไส้/อาเจียน', 'กลืนลำบาก', 'ท้องเสีย', 'ปวดบิดท้อง', 'เบื่ออาหาร', 'ดีซ่าน (ตัวเหลือง/ตาเหลือง)', 'ปวดแน่นชายโครงด้านขวา', 'เหงือกเลือดออก', 'แผลในปาก', 'เลือดออกในทางเดินอาหาร', 'ไม่พบ'].map(symptom => 
                  renderSymptomCheckbox('gastrointestinal', symptom)
                )}
              </div>
            </div>

            {/* 4. ระบบกระดูกและกล้ามเนื้อ */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-xl mb-4 shadow-md border-2 border-rose-200">
              <label className="block text-sm font-bold text-rose-800 mb-3">4. ระบบกระดูกและกล้ามเนื้อ</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['ปวดข้อ', 'ข้ออักเสบ', 'ปวดเมื่อยกล้ามเนื้อ', 'ไม่พบ'].map(symptom => 
                  renderSymptomCheckbox('musculoskeletal', symptom)
                )}
              </div>
            </div>

            {/* 5. ระบบการมองเห็น */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-xl mb-4 shadow-md border-2 border-rose-200">
              <label className="block text-sm font-bold text-rose-800 mb-3">5. ระบบการมองเห็น</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['เยื่อบุตาอักเสบ (ตาแดง)', 'แผลที่กระจกตา', 'ไม่พบ'].map(symptom => 
                  renderSymptomCheckbox('vision', symptom)
                )}
              </div>
            </div>

            {/* 6. ระบบขับถ่าย */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-xl mb-4 shadow-md border-2 border-rose-200">
              <label className="block text-sm font-bold text-rose-800 mb-3">6. ระบบขับถ่าย</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['ปัสสาวะสีชา/สีดำ', 'ปวดหลังส่วนเอว', 'ปัสสาวะออกน้อย', 'ปัสสาวะสีขุ่น', 'ไม่พบ'].map(symptom => 
                  renderSymptomCheckbox('urinary', symptom)
                )}
              </div>
            </div>

            {/* 7. ระบบผิวหนัง (เพิ่มเติม) */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-xl mb-4 shadow-md border-2 border-rose-200">
              <label className="block text-sm font-bold text-rose-800 mb-3">7. ระบบผิวหนัง (เพิ่มเติม)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['จุดเลือดออก', 'ฟกช้ำ', 'ปื้น/จ้ำเลือด', 'ไม่พบ'].map(symptom => 
                  renderSymptomCheckbox('skinAdditional', symptom)
                )}
              </div>
            </div>

            {/* 8. ระบบหู คอ จมูก */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-xl mb-4 shadow-md border-2 border-rose-200">
              <label className="block text-sm font-bold text-rose-800 mb-3">8. ระบบหู คอ จมูก</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['เจ็บคอ', 'เลือดกำเดาไหล', 'ทอนซิลอักเสบ', 'ไม่พบ'].map(symptom => 
                  renderSymptomCheckbox('entNose', symptom)
                )}
              </div>
            </div>

            {/* 9. ระบบอื่นๆ */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-xl mb-4 shadow-md border-2 border-rose-200">
              <label className="block text-sm font-bold text-rose-800 mb-3">9. ระบบอื่นๆ</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['ไข้ Temp > 37.5 °C', 'อ่อนเพลีย', 'หนาวสั่น', 'ไม่พบ'].map(symptom => 
                  renderSymptomCheckbox('other', symptom)
                )}
              </div>
            </div>
          </div>

          {/* ส่วนที่ 2: อวัยวะที่ผิดปกติ */}
          <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100 p-6 rounded-2xl border-2 border-purple-300 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl">🫀</span>
              <h3 className="text-2xl font-bold text-purple-800">ส่วนที่ 2 อวัยวะที่ผิดปกติ</h3>
            </div>

            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-xl shadow-md border-2 border-purple-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['ต่อมน้ำเหลืองโต', 'ม้ามโต', 'ตับอักเสบ', 'ไตอักเสบ', 'ไตวาย', 'กล้ามเนื้อหัวใจอักเสบ', 'ต่อมไทรอยด์อักเสบ', 'ปอดอักเสบ', 'ไม่พบ'].map(symptom => 
                  renderSymptomCheckbox('organInvolvement', symptom)
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentPage(0)}
              className="px-8 py-4 bg-white text-purple-700 border-2 border-purple-300 rounded-xl font-bold hover:bg-purple-50 transition-all shadow-md flex items-center gap-2"
            >
              <ChevronLeft /> กลับหน้า 1
            </button>
            <button
              onClick={clearPage1Data}
              className="px-8 py-4 bg-red-500 text-white border-2 border-red-600 rounded-xl font-bold hover:bg-red-600 transition-all shadow-md"
            >
              🗑️ ล้างข้อมูลหน้านี้
            </button>
            <button
              onClick={saveAndNext}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center gap-2"
            >
              บันทึกและไปหน้า 3 <ChevronRight />
            </button>
          </div>
        </div>
      );
    }

    if (currentPage === 2) {
      const renderLabCheckbox = (section, field, label, unit, placeholder = 'ค่า') => {
        const item = labData[section][field];
        
        return (
          <div className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={(e) => {
                setLabData({
                  ...labData,
                  [section]: {
                    ...labData[section],
                    [field]: { ...item, checked: e.target.checked }
                  }
                });
              }}
              className="w-4 h-4 text-cyan-600 rounded"
            />
            <label className="text-sm font-medium text-gray-700 min-w-[200px]">{label}</label>
            <input
              type="text"
              placeholder={placeholder}
              value={item.value}
              onChange={(e) => {
                setLabData({
                  ...labData,
                  [section]: {
                    ...labData[section],
                    [field]: { ...item, value: e.target.value }
                  }
                });
              }}
              className="w-32 p-2 border-2 border-cyan-300 rounded-lg text-sm"
            />
            <span className="text-sm text-gray-600 min-w-[80px]">{unit}</span>
            <input
              type="text"
              placeholder="รายละเอียดเพิ่มเติม"
              value={item.detail}
              onChange={(e) => {
                setLabData({
                  ...labData,
                  [section]: {
                    ...labData[section],
                    [field]: { ...item, detail: e.target.value }
                  }
                });
              }}
              className="flex-1 p-2 border-2 border-cyan-300 rounded-lg text-sm"
            />
          </div>
        );
      };

      return (
        <div className="space-y-6 p-6">
          <div className="bg-gradient-to-r from-cyan-100 via-blue-100 to-indigo-100 p-6 rounded-2xl border-2 border-cyan-300 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🧪</span>
              <h3 className="text-2xl font-bold text-cyan-800">หน้า 3 ผลตรวจทางห้องปฏิบัติการ</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CBC */}
              <div className="bg-white bg-opacity-90 backdrop-blur-sm p-5 rounded-xl shadow-md border-2 border-cyan-200">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🩸</span>
                  <h4 className="text-lg font-bold text-cyan-800">CBC</h4>
                </div>
                {renderLabCheckbox('cbc', 'wbc', 'WBC', '/µL', 'ค่า')}
                {renderLabCheckbox('cbc', 'aec', 'Absolute eosinophil count (AEC)', '/µL', 'ค่า')}
                {renderLabCheckbox('cbc', 'neutrophil', 'Neutrophil (%)', '%', 'ค่า')}
                {renderLabCheckbox('cbc', 'lymphocyte', 'Lymphocyte (%)', '%', 'ค่า')}
                {renderLabCheckbox('cbc', 'atypicalLymphocytes', 'Atypical lymphocytes (%)', '%', 'ค่า')}
                {renderLabCheckbox('cbc', 'eosinophil', 'Eosinophil (%)', '%', 'ค่า')}
                {renderLabCheckbox('cbc', 'hemoglobin', 'Hemoglobin (Hb)', 'g/dL', 'ค่า')}
                {renderLabCheckbox('cbc', 'platelet', 'Platelet (Plt)', '/µL', 'ค่า')}
              </div>

              {/* LFT */}
              <div className="bg-white bg-opacity-90 backdrop-blur-sm p-5 rounded-xl shadow-md border-2 border-cyan-200">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">💊</span>
                  <h4 className="text-lg font-bold text-cyan-800">LFT (ตับ)</h4>
                </div>
                {renderLabCheckbox('lft', 'ast', 'AST', 'U/L', 'ค่า')}
                {renderLabCheckbox('lft', 'alt', 'ALT', 'U/L', 'ค่า')}
                {renderLabCheckbox('lft', 'alp', 'ALP', 'U/L', 'ค่า')}
                {renderLabCheckbox('lft', 'totalBilirubin', 'Total Bilirubin', 'mg/dL', 'ค่า')}
                {renderLabCheckbox('lft', 'directBilirubin', 'Direct Bilirubin', 'mg/dL', 'ค่า')}
              </div>

              {/* RFT */}
              <div className="bg-white bg-opacity-90 backdrop-blur-sm p-5 rounded-xl shadow-md border-2 border-cyan-200">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🧫</span>
                  <h4 className="text-lg font-bold text-cyan-800">RFT (ไต)</h4>
                </div>
                {renderLabCheckbox('rft', 'bun', 'BUN', 'mg/dL', 'ค่า')}
                {renderLabCheckbox('rft', 'creatinine', 'Creatinine', 'mg/dL', 'ค่า')}
                {renderLabCheckbox('rft', 'egfr', 'eGFR', 'mL/min/1.73m²', 'ค่า')}
                {renderLabCheckbox('rft', 'uo', 'UO (Urine output)', 'mL/kg/hr', 'ค่า/ผล')}
              </div>

              {/* Electrolytes */}
              <div className="bg-white bg-opacity-90 backdrop-blur-sm p-5 rounded-xl shadow-md border-2 border-cyan-200">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">⚡</span>
                  <h4 className="text-lg font-bold text-cyan-800">Electrolytes</h4>
                </div>
                {renderLabCheckbox('electrolytes', 'na', 'Na', 'mmol/L', 'ค่า')}
                {renderLabCheckbox('electrolytes', 'k', 'K', 'mmol/L', 'ค่า')}
                {renderLabCheckbox('electrolytes', 'cl', 'Cl', 'mmol/L', 'ค่า')}
                {renderLabCheckbox('electrolytes', 'hco3', 'HCO3- (TCO2)', 'mmol/L', 'ค่า')}
                {renderLabCheckbox('electrolytes', 'ca', 'Ca', 'mg/dL', 'ค่า')}
                {renderLabCheckbox('electrolytes', 'mg', 'Mg', 'mg/dL', 'ค่า')}
                {renderLabCheckbox('electrolytes', 'phosphate', 'Phosphate', 'mg/dL', 'ค่า')}
              </div>

              {/* Urinalysis */}
              <div className="bg-white bg-opacity-90 backdrop-blur-sm p-5 rounded-xl shadow-md border-2 border-cyan-200">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🧬</span>
                  <h4 className="text-lg font-bold text-cyan-800">Urinalysis (UA)</h4>
                </div>
                {renderLabCheckbox('urinalysis', 'protein', 'Protein', 'mg/dL / +', 'ค่า/ผล')}
                {renderLabCheckbox('urinalysis', 'bloodRbc', 'Blood/RBC', 'cells/HPF', 'ค่า/ผล')}
                {renderLabCheckbox('urinalysis', 'wbc', 'WBC', 'cells/HPF', 'ค่า/ผล')}
                {renderLabCheckbox('urinalysis', 'nitrite', 'Nitrite', 'pos/neg', 'ค่า/ผล')}
                {renderLabCheckbox('urinalysis', 'leukocyteEsterase', 'Leukocyte esterase', 'pos/neg', 'ค่า/ผล')}
                {renderLabCheckbox('urinalysis', 'specificGravity', 'Specific gravity', '', 'ค่า/ผล')}
                {renderLabCheckbox('urinalysis', 'ph', 'pH', '', 'ค่า/ผล')}
                {renderLabCheckbox('urinalysis', 'glucose', 'Glucose', 'mg/dL / +', 'ค่า/ผล')}
                {renderLabCheckbox('urinalysis', 'ketone', 'Ketone', '+', 'ค่า/ผล')}
              </div>

              {/* Lung */}
              <div className="bg-white bg-opacity-90 backdrop-blur-sm p-5 rounded-xl shadow-md border-2 border-cyan-200">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🫁</span>
                  <h4 className="text-lg font-bold text-cyan-800">ปอด</h4>
                </div>
                {renderLabCheckbox('lung', 'spo2', 'SpO2', '%', 'ค่า')}
                {renderLabCheckbox('lung', 'lungFunction', 'Lung function (sound/CXR)', '', 'ค่า/ผล')}
              </div>

              {/* Cardiac */}
              <div className="bg-white bg-opacity-90 backdrop-blur-sm p-5 rounded-xl shadow-md border-2 border-cyan-200">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">❤️</span>
                  <h4 className="text-lg font-bold text-cyan-800">หัวใจ</h4>
                </div>
                {renderLabCheckbox('cardiac', 'troponinI', 'Troponin I', 'ng/mL', 'ค่า')}
                {renderLabCheckbox('cardiac', 'troponinT', 'Troponin T', 'ng/mL', 'ค่า')}
                {renderLabCheckbox('cardiac', 'ckMb', 'CK-MB', 'ng/mL', 'ค่า')}
                {renderLabCheckbox('cardiac', 'ekg', 'EKG', '', 'ค่า/ผล')}
              </div>

              {/* Immunology */}
              <div className="bg-white bg-opacity-90 backdrop-blur-sm p-5 rounded-xl shadow-md border-2 border-cyan-200">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🔬</span>
                  <h4 className="text-lg font-bold text-cyan-800">Immunology / Allergy</h4>
                </div>
                {renderLabCheckbox('immunology', 'ige', 'IgE', 'IU/mL', 'ค่า/ผล')}
                {renderLabCheckbox('immunology', 'complement', 'Complement (C3/C4)', 'mg/dL', 'ค่า/ผล')}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentPage(1)}
              className="px-8 py-4 bg-white text-purple-700 border-2 border-purple-300 rounded-xl font-bold hover:bg-purple-50 transition-all shadow-md flex items-center gap-2"
            >
              <ChevronLeft /> กลับหน้า 2
            </button>
            <button
              onClick={clearPage2Data}
              className="px-8 py-4 bg-red-500 text-white border-2 border-red-600 rounded-xl font-bold hover:bg-red-600 transition-all shadow-md"
            >
              🗑️ ล้างข้อมูลหน้านี้
            </button>
            <button
              onClick={saveAndNext}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center gap-2"
            >
              บันทึกและไปหน้า 4 <ChevronRight />
            </button>
          </div>
        </div>
      );
    }

    if (currentPage === 3) {
      return (
        <div className="space-y-6 p-6">
          <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6 rounded-2xl border-2 border-indigo-300 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl">📊</span>
                <h3 className="text-2xl font-bold text-indigo-800">หน้า 4 Naranjo Algorithm</h3>
              </div>
              <button
                onClick={addNewDrugAssessment}
                className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg flex items-center gap-2"
              >
                <span className="text-xl">+</span> เพิ่มยาตัวใหม่
              </button>
            </div>

            {naranjoAssessments.map((assessment, index) => {
              const score = calculateScore(assessment.answers);
              const interpretation = getInterpretation(score);

              return (
                <div key={assessment.id} className="bg-white p-6 rounded-xl mb-6 shadow-md border-2 border-indigo-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-indigo-700">ยาตัวที่ {index + 1}</h4>
                    {naranjoAssessments.length > 1 && (
                      <button
                        onClick={() => removeDrugAssessment(assessment.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                      >
                        ลบ
                      </button>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อยา</label>
                    <input
                      type="text"
                      placeholder="ระบุชื่อยา เช่น Amoxicillin"
                      value={assessment.drugName}
                      onChange={(e) => updateDrugName(assessment.id, e.target.value)}
                      className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-4">
                    {naranjoQuestions.map((item, qIdx) => {
                      const questionKey = `q${qIdx + 1}`;
                      const currentAnswer = assessment.answers[questionKey];
                      
                      // ตรวจสอบว่าปุ่มไหนถูกเลือกโดยใช้ type แทนค่า
                      const isYesSelected = currentAnswer?.type === 'yes';
                      const isNoSelected = currentAnswer?.type === 'no';
                      const isUnknownSelected = currentAnswer?.type === 'unknown';
                      
                      return (
                        <div key={qIdx} className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-medium text-gray-800 mb-3">{item.q}</p>
                          <div className="flex gap-3">
                            <button
                              onClick={() => {
                                if (isYesSelected) {
                                  updateAnswer(assessment.id, questionKey, { type: null, value: null });
                                } else {
                                  updateAnswer(assessment.id, questionKey, { type: 'yes', value: item.yes });
                                }
                              }}
                              className={`px-4 py-2 rounded-lg font-medium transition-all border-2 ${
                                isYesSelected
                                  ? 'bg-green-500 text-white border-green-600'
                                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              ใช่ ({item.yes > 0 ? '+' : ''}{item.yes})
                            </button>
                            <button
                              onClick={() => {
                                if (isNoSelected) {
                                  updateAnswer(assessment.id, questionKey, { type: null, value: null });
                                } else {
                                  updateAnswer(assessment.id, questionKey, { type: 'no', value: item.no });
                                }
                              }}
                              className={`px-4 py-2 rounded-lg font-medium transition-all border-2 ${
                                isNoSelected
                                  ? 'bg-red-500 text-white border-red-600'
                                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              ไม่ใช่ ({item.no})
                            </button>
                            <button
                              onClick={() => {
                                if (isUnknownSelected) {
                                  updateAnswer(assessment.id, questionKey, { type: null, value: null });
                                } else {
                                  updateAnswer(assessment.id, questionKey, { type: 'unknown', value: item.unknown });
                                }
                              }}
                              className={`px-4 py-2 rounded-lg font-medium transition-all border-2 ${
                                isUnknownSelected
                                  ? 'bg-yellow-500 text-white border-yellow-600'
                                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              ไม่ทราบ ({item.unknown})
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className={`mt-6 p-6 rounded-lg ${interpretation.bg}`}>
                    <h3 className="text-lg font-semibold mb-2">ผลการประเมิน</h3>
                    <p className={`text-3xl font-bold ${interpretation.color}`}>
                      {score} คะแนน
                    </p>
                    <p className="mt-2 text-lg font-medium">
                      {interpretation.level}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentPage(2)}
              className="px-8 py-4 bg-white text-purple-700 border-2 border-purple-300 rounded-xl font-bold hover:bg-purple-50 transition-all shadow-md flex items-center gap-2"
            >
              <ChevronLeft /> กลับหน้า 3
            </button>
            <button
              onClick={clearPage3Data}
              className="px-8 py-4 bg-red-500 text-white border-2 border-red-600 rounded-xl font-bold hover:bg-red-600 transition-all shadow-md"
            >
              🗑️ ล้างข้อมูลหน้านี้
            </button>
            <button
              onClick={() => setCurrentPage(4)}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center gap-2"
            >
              ไปหน้า 5 (Timeline) <ChevronRight />
            </button>
          </div>
        </div>
      );
    }

    if (currentPage === 4) {
      const allEvents = getAllTimelineEvents();

      return (
        <div className="space-y-6 p-6">
          <div className="bg-gradient-to-r from-violet-100 via-fuchsia-100 to-pink-100 p-6 rounded-2xl border-2 border-violet-300 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl">📅</span>
                <h3 className="text-2xl font-bold text-violet-800">หน้า 5 Timeline ประเมินการแพ้ยา</h3>
              </div>
              <button
                onClick={addNewDrugTimeline}
                className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg flex items-center gap-2"
              >
                <span className="text-xl">+</span> เพิ่มยาตัวใหม่
              </button>
            </div>

            {/* Drug Timeline Forms */}
            {timelineEvents.map((drug, index) => (
              <div key={drug.id} className="bg-white p-6 rounded-xl mb-6 shadow-md border-2" style={{ borderColor: drug.color }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: drug.color }}></div>
                    <h4 className="text-xl font-bold" style={{ color: drug.color }}>ยาตัวที่ {index + 1}</h4>
                  </div>
                  {timelineEvents.length > 1 && (
                    <button
                      onClick={() => removeDrugTimeline(drug.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                    >
                      ลบ
                    </button>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อยา</label>
                  <input
                    type="text"
                    placeholder="ระบุชื่อยา"
                    value={drug.drugName}
                    onChange={(e) => updateTimelineDrugName(drug.id, e.target.value)}
                    className="w-full p-3 border-2 rounded-lg focus:outline-none"
                    style={{ borderColor: drug.color }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {drug.events.map((event) => (
                    <div key={event.type} className="bg-gray-50 p-4 rounded-lg">
                      <label className="block text-sm font-bold text-gray-700 mb-2">{event.label}</label>
                      <div className="flex gap-2">
                        <input
                          type="date"
                          value={event.date}
                          onChange={(e) => updateTimelineEvent(drug.id, event.type, 'date', e.target.value)}
                          className="flex-1 p-2 border-2 border-gray-300 rounded-lg"
                        />
                        <input
                          type="time"
                          value={event.time}
                          onChange={(e) => updateTimelineEvent(drug.id, event.type, 'time', e.target.value)}
                          className="w-32 p-2 border-2 border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* ADR Events Section */}
            <div className="bg-white p-6 rounded-xl mb-6 shadow-md border-2 border-red-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500"></div>
                  <h4 className="text-xl font-bold text-red-600">ADR (Adverse Drug Reaction)</h4>
                </div>
                <button
                  onClick={addNewAdrEvent}
                  className="px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all shadow-lg flex items-center gap-2"
                >
                  <span className="text-xl">+</span> เพิ่ม ADR
                </button>
              </div>

              {adrEvents.map((adr, index) => (
                <div key={adr.id} className="bg-red-50 p-4 rounded-lg mb-4 border-2 border-red-200">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-bold text-red-700">ADR {index + 1}</h5>
                    {adrEvents.length > 1 && (
                      <button
                        onClick={() => removeAdrEvent(adr.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm"
                      >
                        ลบ
                      </button>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">อาการ</label>
                    <input
                      type="text"
                      placeholder="ระบุอาการ เช่น ผื่นขึ้น, คัน, บวม"
                      value={adr.symptom}
                      onChange={(e) => updateAdrEvent(adr.id, 'symptom', e.target.value)}
                      className="w-full p-3 border-2 border-red-300 rounded-lg focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">วันที่เกิด</label>
                      <input
                        type="date"
                        value={adr.date}
                        onChange={(e) => updateAdrEvent(adr.id, 'date', e.target.value)}
                        className="w-full p-2 border-2 border-red-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">เวลาที่เกิด</label>
                      <input
                        type="time"
                        value={adr.time}
                        onChange={(e) => updateAdrEvent(adr.id, 'time', e.target.value)}
                        className="w-full p-2 border-2 border-red-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">วันที่หาย</label>
                      <input
                        type="date"
                        value={adr.resolveDate}
                        onChange={(e) => updateAdrEvent(adr.id, 'resolveDate', e.target.value)}
                        className="w-full p-2 border-2 border-red-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">เวลาที่หาย</label>
                      <input
                        type="time"
                        value={adr.resolveTime}
                        onChange={(e) => updateAdrEvent(adr.id, 'resolveTime', e.target.value)}
                        className="w-full p-2 border-2 border-red-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Generate Timeline Button */}
            <div className="flex justify-center mb-6">
              <button
                onClick={() => {
                  const newState = !showTimeline;
                  setShowTimeline(newState);
                  if (newState) {
                    setTimeout(() => {
                      const timelineElement = document.getElementById('visual-timeline');
                      if (timelineElement) {
                        timelineElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  }
                }}
                className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg flex items-center gap-2 text-lg"
              >
                {showTimeline ? (
                  <>
                    <span className="text-2xl">✕</span> ซ่อน Timeline
                  </>
                ) : (
                  <>
                    <span className="text-2xl">▶</span> สร้าง Timeline
                  </>
                )}
              </button>
            </div>

            {/* Visual Timeline - Gantt Chart Style */}
            {showTimeline && (
              <div id="visual-timeline" className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-300">
                <h4 className="text-2xl font-bold text-gray-800 mb-6">Visual Timeline</h4>
                
                {(() => {
                  // Today's date - October 30, 2025
                  const today = new Date('2025-10-30T23:59:59');
                  
                  // Collect all dates from drugs and ADRs
                  const allDates = [today]; // Always include today
                  timelineEvents.forEach(drug => {
                    drug.events.forEach(event => {
                      if (event.date) {
                        allDates.push(new Date(event.date + ' ' + (event.time || '00:00')));
                      }
                    });
                  });
                  adrEvents.forEach(adr => {
                    if (adr.date) {
                      allDates.push(new Date(adr.date + ' ' + (adr.time || '00:00')));
                    }
                    if (adr.resolveDate) {
                      allDates.push(new Date(adr.resolveDate + ' ' + (adr.resolveTime || '00:00')));
                    }
                  });
                  
                  if (allDates.length === 1) { // Only today
                    return <p className="text-gray-500 text-center py-8">กรุณากรอกวันที่และเวลาของยาหรือ ADR เพื่อแสดง Timeline</p>;
                  }
                  
                  const minDate = new Date(Math.min(...allDates));
                  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime()), today.getTime()));
                  
                  // Set to start of day for minDate and end of day for maxDate
                  minDate.setHours(0, 0, 0, 0);
                  maxDate.setHours(23, 59, 59, 999);
                  
                  const daysDiff = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1;
                  const dateHeaders = [];
                  
                  for (let i = 0; i < daysDiff; i++) {
                    const date = new Date(minDate);
                    date.setDate(date.getDate() + i);
                    dateHeaders.push(date);
                  }
                  
                  const totalDays = dateHeaders.length;
                  
                  return (
                    <div className="overflow-x-auto" style={{ maxWidth: '100%' }}>
                      <div style={{ minWidth: `${Math.max(totalDays * 100, 800)}px` }}>
                        {/* Date Headers */}
                        <div className="flex mb-4 pb-2 border-b-2 border-gray-400">
                          <div className="w-32 flex-shrink-0"></div>
                          <div className="flex-1 flex">
                            {dateHeaders.map((date, idx) => (
                              <div key={idx} className="flex-1 text-center font-bold text-gray-800" style={{ minWidth: '100px' }}>
                                {date.getDate()} ต.ค.
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Drug Timeline Rows */}
                        {timelineEvents.filter(drug => drug.events.some(e => e.date)).map((drug, drugIdx) => {
                          const drugStart = drug.events.find(e => e.type === 'drug_start');
                          const drugStop = drug.events.find(e => e.type === 'drug_stop');
                          
                          if (!drugStart?.date) return null;
                          
                          const drugStartDate = new Date(drugStart.date + ' ' + (drugStart.time || '00:00'));
                          const drugStopDate = drugStop?.date ? new Date(drugStop.date + ' ' + (drugStop.time || '00:00')) : today;
                          
                          // Calculate position as days from start - use exact day boundaries
                          const startDayOffset = Math.floor((drugStartDate - minDate) / (1000 * 60 * 60 * 24));
                          const endDayOffset = Math.floor((drugStopDate - minDate) / (1000 * 60 * 60 * 24)) + 1;
                          
                          const drugStartPos = (startDayOffset / totalDays) * 100;
                          const drugWidth = ((endDayOffset - startDayOffset) / totalDays) * 100;
                          
                          const isOngoing = !drugStop?.date;
                          
                          return (
                            <div key={drug.id} className="flex items-center mb-4">
                              <div className="w-32 flex-shrink-0 pr-4">
                                <span className="font-bold text-base text-gray-800">
                                  {drug.drugName || `ยา ${drugIdx + 1}`}
                                </span>
                              </div>
                              <div className="flex-1 relative h-20">
                                {/* Drug Timeline Bar */}
                                <div
                                  className="absolute rounded-lg shadow-lg"
                                  style={{
                                    left: `${drugStartPos}%`,
                                    width: `${Math.max(drugWidth, 2)}%`,
                                    backgroundColor: drug.color,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    padding: '12px 16px'
                                  }}
                                >
                                  <div className="text-white font-bold text-base">
                                    {drug.drugName || 'ยา'}
                                  </div>
                                  <div className="text-white text-sm opacity-95">
                                    เริ่ม: {drugStartDate.getFullYear()}-{String(drugStartDate.getMonth() + 1).padStart(2, '0')}-{String(drugStartDate.getDate()).padStart(2, '0')} {drugStart.time || '00:00'}
                                    {isOngoing && ' (Ongoing)'}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        
                        {/* ADR Rows - Each ADR gets its own row with red color */}
                        {adrEvents.filter(adr => adr.date).map((adr, adrIdx) => {
                          const adrStartDate = new Date(adr.date + ' ' + (adr.time || '00:00'));
                          const adrEndDate = adr.resolveDate ? new Date(adr.resolveDate + ' ' + (adr.resolveTime || '00:00')) : today;
                          
                          // Calculate position as days from start - use exact day boundaries
                          const startDayOffset = Math.floor((adrStartDate - minDate) / (1000 * 60 * 60 * 24));
                          const endDayOffset = Math.floor((adrEndDate - minDate) / (1000 * 60 * 60 * 24)) + 1;
                          
                          const adrStartPos = (startDayOffset / totalDays) * 100;
                          const adrWidth = ((endDayOffset - startDayOffset) / totalDays) * 100;
                          
                          const isOngoing = !adr.resolveDate;
                          
                          return (
                            <div key={adr.id} className="flex items-center mb-4">
                              <div className="w-32 flex-shrink-0 pr-4">
                                <span className="font-bold text-base text-red-600">
                                  {adr.symptom || `ADR ${adrIdx + 1}`}
                                </span>
                              </div>
                              <div className="flex-1 relative h-20">
                                {/* ADR Box - Always Red */}
                                <div
                                  className="absolute rounded-lg shadow-lg"
                                  style={{
                                    left: `${adrStartPos}%`,
                                    width: `${Math.max(adrWidth, 2)}%`,
                                    backgroundColor: '#EF4444',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    padding: '12px 16px'
                                  }}
                                >
                                  <div className="text-white font-bold text-base">
                                    {adr.symptom || 'ADR'}
                                  </div>
                                  <div className="text-white text-sm opacity-95">
                                    เริ่ม: {adrStartDate.getFullYear()}-{String(adrStartDate.getMonth() + 1).padStart(2, '0')}-{String(adrStartDate.getDate()).padStart(2, '0')} {adr.time || '00:00'}
                                    {isOngoing && ' (Ongoing)'}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentPage(3)}
              className="px-8 py-4 bg-white text-purple-700 border-2 border-purple-300 rounded-xl font-bold hover:bg-purple-50 transition-all shadow-md flex items-center gap-2"
            >
              <ChevronLeft /> กลับหน้า 4
            </button>
            <button
              onClick={clearPage4Data}
              className="px-8 py-4 bg-red-500 text-white border-2 border-red-600 rounded-xl font-bold hover:bg-red-600 transition-all shadow-md"
            >
              🗑️ ล้างข้อมูลหน้านี้
            </button>
            <button
              onClick={() => setCurrentPage(5)}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center gap-2"
            >
              ไปหน้า 6 (สรุปการประเมิน) <ChevronRight />
            </button>
          </div>
        </div>
      );
    }

    if (currentPage === 5) {
      return (
        <div className="max-w-7xl mx-auto">
          <div id="page6-content" className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-8 rounded-2xl shadow-2xl border-2 border-indigo-200">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">📊</span>
              <h2 className="text-3xl font-bold text-indigo-800">หน้า 6: สรุปการประเมิน</h2>
            </div>

            {/* ส่วนที่ 1: สรุปผลการวิเคราะห์อัตโนมัติ */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-6 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🤖</span>
                <h3 className="text-2xl font-bold text-blue-800">ส่วนที่ 1: สรุปผลการวิเคราะห์อัตโนมัติ</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. ประเภทแพ้ยา */}
                <div className="bg-blue-50 p-5 rounded-lg border-2 border-blue-300">
                  <h4 className="text-lg font-bold text-blue-900 mb-3">1. ประเภทแพ้ยา (Type of ADR)</h4>
                  <div className="space-y-2">
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <p className="font-semibold text-gray-800">Type A-F ADR Classification:</p>
                      <p className="text-gray-600 text-sm mt-1">รอการประเมินจากข้อมูล...</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <p className="font-semibold text-gray-800">Mechanism:</p>
                      <p className="text-gray-600 text-sm mt-1">
                        • Non-immunologic (Pseudoallergic)<br/>
                        • Immunologic (Type I-IV)<br/>
                        รอการประเมินจากข้อมูล...
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. ชนิดการแพ้ยา */}
                <div className="bg-green-50 p-5 rounded-lg border-2 border-green-300">
                  <h4 className="text-lg font-bold text-green-900 mb-3">2. ชนิดการแพ้ยา (Type of Reaction)</h4>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <p className="text-gray-600 text-sm">
                      <span className="font-semibold">ชนิดที่ประเมินได้:</span><br/>
                      • Urticaria<br/>
                      • Angioedema<br/>
                      • Anaphylaxis<br/>
                      • Fixed Drug Eruption<br/>
                      • Maculopapular Rash<br/>
                      • AGEP, SJS/TEN, DRESS และอื่นๆ<br/>
                      <span className="font-semibold text-green-700 mt-2 block">รอการประเมินจากข้อมูล...</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ส่วนที่ 2: ยาที่มีรายงานการแพ้ */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-6 border-2 border-orange-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">💊</span>
                <h3 className="text-2xl font-bold text-orange-800">ส่วนที่ 2: ยาที่มีรายงานการเกิดการแพ้ยาดังกล่าว</h3>
              </div>
              <div className="bg-orange-50 p-5 rounded-lg border-2 border-orange-300">
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">ยาที่ผู้ป่วยได้รับ:</span>
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {timelineEvents.map((drug, idx) => (
                    drug.drugName && <li key={idx}>{drug.drugName}</li>
                  ))}
                  {timelineEvents.every(drug => !drug.drugName) && (
                    <li className="text-gray-400">ยังไม่มีข้อมูลยา</li>
                  )}
                </ul>
                <div className="mt-4 p-3 bg-white rounded border border-orange-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-orange-700">รายงานการแพ้:</span><br/>
                    รอข้อมูลและการวิเคราะห์จากระบบ...
                  </p>
                </div>
              </div>
            </div>

            {/* ส่วนที่ 3: แนวทางการรักษา */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-6 border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">⚕️</span>
                <h3 className="text-2xl font-bold text-purple-800">ส่วนที่ 3: แนวทางการรักษา</h3>
              </div>
              <div className="bg-purple-50 p-5 rounded-lg border-2 border-purple-300">
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded border border-purple-200">
                    <p className="font-semibold text-purple-900 mb-2">การจัดการเบื้องต้น:</p>
                    <p className="text-gray-600 text-sm">รอข้อมูลจาก Guidelines...</p>
                  </div>
                  <div className="bg-white p-4 rounded border border-purple-200">
                    <p className="font-semibold text-purple-900 mb-2">การรักษาเฉพาะตามชนิดการแพ้:</p>
                    <p className="text-gray-600 text-sm">รอข้อมูลจาก Guidelines...</p>
                  </div>
                  <div className="bg-white p-4 rounded border border-purple-200">
                    <p className="font-semibold text-purple-900 mb-2">การติดตามผล:</p>
                    <p className="text-gray-600 text-sm">รอข้อมูลจาก Guidelines...</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ส่วนที่ 4: Naranjo Score และ Timeline */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-6 border-2 border-teal-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📈</span>
                <h3 className="text-2xl font-bold text-teal-800">ส่วนที่ 4: ผลการประเมิน Naranjo และ Timeline</h3>
              </div>

              {/* Naranjo Results */}
              <div className="mb-6">
                <h4 className="text-xl font-bold text-teal-700 mb-3">ผลการประเมิน Naranjo Adverse Drug Reaction Probability Scale</h4>
                {naranjoAssessments.map((assessment, idx) => {
                  const totalScore = Object.values(assessment.answers).reduce((sum, answer) => {
                    return sum + (answer.value || 0);
                  }, 0);

                  let probability = '';
                  let probabilityColor = '';
                  if (totalScore >= 9) {
                    probability = 'Definite (แน่นอน)';
                    probabilityColor = 'text-red-600 bg-red-100';
                  } else if (totalScore >= 5) {
                    probability = 'Probable (น่าจะเป็น)';
                    probabilityColor = 'text-orange-600 bg-orange-100';
                  } else if (totalScore >= 1) {
                    probability = 'Possible (เป็นไปได้)';
                    probabilityColor = 'text-yellow-600 bg-yellow-100';
                  } else {
                    probability = 'Doubtful (น่าสงสัย)';
                    probabilityColor = 'text-gray-600 bg-gray-100';
                  }

                  return (
                    <div key={assessment.id} className="bg-teal-50 p-4 rounded-lg border-2 border-teal-300 mb-3">
                      <div className="flex justify-between items-center">
                        <h5 className="text-lg font-bold text-teal-900">
                          {assessment.drugName || `ยา ${idx + 1}`}
                        </h5>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">คะแนนรวม</p>
                          <p className="text-3xl font-bold text-teal-700">{totalScore}</p>
                        </div>
                      </div>
                      <div className={`mt-3 p-3 rounded-lg ${probabilityColor}`}>
                        <p className="font-bold text-center text-lg">{probability}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Timeline Display */}
              <div className="mb-4">
                <h4 className="text-xl font-bold text-teal-700 mb-3">Timeline แสดงความสัมพันธ์ระหว่างยาและอาการ</h4>
                {(() => {
                  const today = new Date('2025-10-30T23:59:59');
                  const allDates = [today];
                  
                  timelineEvents.forEach(drug => {
                    drug.events.forEach(event => {
                      if (event.date) {
                        allDates.push(new Date(event.date + ' ' + (event.time || '00:00')));
                      }
                    });
                  });
                  adrEvents.forEach(adr => {
                    if (adr.date) {
                      allDates.push(new Date(adr.date + ' ' + (adr.time || '00:00')));
                    }
                    if (adr.resolveDate) {
                      allDates.push(new Date(adr.resolveDate + ' ' + (adr.resolveTime || '00:00')));
                    }
                  });
                  
                  if (allDates.length === 1) {
                    return <p className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg">ไม่มีข้อมูล Timeline</p>;
                  }
                  
                  const minDate = new Date(Math.min(...allDates));
                  const maxDate = new Date(Math.max(...allDates));
                  minDate.setHours(0, 0, 0, 0);
                  maxDate.setHours(23, 59, 59, 999);
                  const daysDiff = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1;
                  const dateHeaders = [];
                  
                  for (let i = 0; i < daysDiff; i++) {
                    const date = new Date(minDate);
                    date.setDate(date.getDate() + i);
                    dateHeaders.push(date);
                  }
                  
                  const totalDays = dateHeaders.length;
                  
                  return (
                    <div className="bg-teal-50 p-4 rounded-lg border-2 border-teal-300 overflow-x-auto">
                      <div style={{ minWidth: `${Math.max(totalDays * 100, 800)}px` }}>
                        <div className="flex mb-4 pb-2 border-b-2 border-gray-400">
                          <div className="w-32 flex-shrink-0"></div>
                          <div className="flex-1 flex">
                            {dateHeaders.map((date, idx) => (
                              <div key={idx} className="flex-1 text-center font-bold text-gray-800" style={{ minWidth: '100px' }}>
                                {date.getDate()} ต.ค.
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {timelineEvents.filter(drug => drug.events.some(e => e.date)).map((drug, drugIdx) => {
                          const drugStart = drug.events.find(e => e.type === 'drug_start');
                          const drugStop = drug.events.find(e => e.type === 'drug_stop');
                          
                          if (!drugStart?.date) return null;
                          
                          const drugStartDate = new Date(drugStart.date + ' ' + (drugStart.time || '00:00'));
                          const drugStopDate = drugStop?.date ? new Date(drugStop.date + ' ' + (drugStop.time || '00:00')) : today;
                          
                          const startDayOffset = Math.floor((drugStartDate - minDate) / (1000 * 60 * 60 * 24));
                          const endDayOffset = Math.floor((drugStopDate - minDate) / (1000 * 60 * 60 * 24)) + 1;
                          const drugStartPos = (startDayOffset / totalDays) * 100;
                          const drugWidth = ((endDayOffset - startDayOffset) / totalDays) * 100;
                          const isOngoing = !drugStop?.date;
                          
                          return (
                            <div key={drug.id} className="flex items-center mb-3">
                              <div className="w-32 flex-shrink-0 pr-4">
                                <span className="font-bold text-sm text-gray-800">
                                  {drug.drugName || `ยา ${drugIdx + 1}`}
                                </span>
                              </div>
                              <div className="flex-1 relative h-16">
                                <div
                                  className="absolute rounded-lg shadow-md"
                                  style={{
                                    left: `${drugStartPos}%`,
                                    width: `${Math.max(drugWidth, 2)}%`,
                                    backgroundColor: drug.color,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    padding: '8px 12px'
                                  }}
                                >
                                  <div className="text-white font-bold text-sm">
                                    {drug.drugName || 'ยา'}
                                    {isOngoing && ' (Ongoing)'}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        
                        {adrEvents.filter(adr => adr.date).map((adr, adrIdx) => {
                          const adrStartDate = new Date(adr.date + ' ' + (adr.time || '00:00'));
                          const adrEndDate = adr.resolveDate ? new Date(adr.resolveDate + ' ' + (adr.resolveTime || '00:00')) : today;
                          
                          const startDayOffset = Math.floor((adrStartDate - minDate) / (1000 * 60 * 60 * 24));
                          const endDayOffset = Math.floor((adrEndDate - minDate) / (1000 * 60 * 60 * 24)) + 1;
                          const adrStartPos = (startDayOffset / totalDays) * 100;
                          const adrWidth = ((endDayOffset - startDayOffset) / totalDays) * 100;
                          const isOngoing = !adr.resolveDate;
                          
                          return (
                            <div key={adr.id} className="flex items-center mb-3">
                              <div className="w-32 flex-shrink-0 pr-4">
                                <span className="font-bold text-sm text-red-600">
                                  {adr.symptom || `ADR ${adrIdx + 1}`}
                                </span>
                              </div>
                              <div className="flex-1 relative h-16">
                                <div
                                  className="absolute rounded-lg shadow-md"
                                  style={{
                                    left: `${adrStartPos}%`,
                                    width: `${Math.max(adrWidth, 2)}%`,
                                    backgroundColor: '#EF4444',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    padding: '8px 12px'
                                  }}
                                >
                                  <div className="text-white font-bold text-sm">
                                    {adr.symptom || 'ADR'}
                                    {isOngoing && ' (Ongoing)'}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center no-print">
              <button
                onClick={() => setCurrentPage(4)}
                className="px-8 py-4 bg-white text-purple-700 border-2 border-purple-300 rounded-xl font-bold hover:bg-purple-50 transition-all shadow-md flex items-center gap-2"
              >
                <ChevronLeft /> กลับหน้า 5
              </button>
              <div className="flex gap-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Print button clicked!');
                    try {
                      window.print();
                    } catch (error) {
                      console.error('Print error:', error);
                      alert('ไม่สามารถเปิด Print ได้ กรุณากด Ctrl+P แทน');
                    }
                  }}
                  className="px-8 py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg flex items-center gap-2"
                >
                  🖨️ Print
                </button>
                <button
                  onClick={() => alert('บันทึกข้อมูลเรียบร้อยแล้ว!')}
                  className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" /> บันทึกข้อมูลทั้งหมด
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return <div className="p-6"><p className="text-gray-600">กำลังพัฒนา...</p></div>;
  };

  return (
    <div className="min-h-screen relative overflow-hidden p-4" style={{ fontFamily: 'Sarabun, sans-serif' }}>
      <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"></div>
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.1))',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
              animation: `float ${Math.random() * 15 + 15}s linear infinite`,
              animationDelay: `${Math.random() * 8}s`
            }}
          ></div>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap');
        @keyframes float {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-10vh) scale(0.5); opacity: 0; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-6 pt-8 no-print">
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-2xl">ระบบประเมินการแพ้ยา</h1>
          <p className="text-white text-xl drop-shadow-lg bg-white bg-opacity-20 inline-block px-6 py-2 rounded-full">
            โรงพยาบาลพระอาจารย์ฝั้น อาจาโร
          </p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-print">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentPage(tab.id)}
              className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
                currentPage === tab.id
                  ? 'bg-white text-purple-700 shadow-2xl scale-105'
                  : 'bg-white bg-opacity-40 text-white hover:bg-opacity-60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl shadow-2xl min-h-[600px] border-4 border-white border-opacity-50">
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

export default DrugAllergyAssessment;
