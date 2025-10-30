/* ========================================
   Drug Allergy Assessment Form - JavaScript
   ======================================== */

// ===========================================
// State Management
// ===========================================

const APP_STATE = {
  currentPage: 0,
  patientData: {},
  skinData: {},
  otherSystemsData: {},
  labData: {},
  naranjoAssessments: [{
    id: 1,
    drugName: '',
    answers: {}
  }],
  timelineEvents: [{
    id: 1,
    drugName: '',
    color: '#3B82F6',
    events: [
      { type: 'drug_start', date: '', time: '', label: 'เริ่มให้ยา' },
      { type: 'drug_stop', date: '', time: '', label: 'หยุดยา' }
    ]
  }],
  adrEvents: [{
    id: 1,
    symptom: '',
    date: '',
    time: '',
    resolveDate: '',
    resolveTime: ''
  }],
  uploadedImage: null,
  showTimeline: false
};

// ===========================================
// Data Arrays
// ===========================================

const DATA_ARRAYS = {
  rashShape: ['ตุ่มนูน', 'ตุ่มแบนราบ', 'ปื้นนูน', 'วงกลมชั้นเดียว', 'วงกลม 3 ชั้น', 'วงรี', 'ขอบหยัก', 'ขอบเรียบ', 'ขอบไม่ชัดเจน', 'จุดเล็ก', 'จ้ำเลือด'],
  rashColor: ['แดง', 'แดงไหม้', 'แดงซีด', 'ซีด', 'ใส', 'ม่วง', 'เหลือง', 'มันเงา', 'ดำ', 'เทา'],
  skinPeeling: ['ผิวหนังหลุดลอกตรงกลางผื่น', 'ผิวหนังหลุดลอกไม่เกิน 10% ของ BSA', 'ผิวหนังหลุดลอกเกิน 30% ของ BSA', 'ไม่พบ'],
  dryness: ['ขุย', 'แห้ง', 'ลอก', 'ไม่พบ'],
  pain: ['ปวด', 'แสบ', 'เจ็บ', 'ไม่พบ'],
  location: ['ทั่วร่างกาย', 'ศีรษะ', 'มือ', 'เท้า', 'หน้า', 'แขน', 'ขา', 'อวัยวะเพศ', 'ริมฝีปาก', 'รอบดวงตา', 'จมูก', 'ลำคอ', 'รักแร้', 'ขาหนีบ', 'หน้าอก', 'หลัง', 'ทวาร'],

  systems: {
    respiratory: ['เจ็บคอ', 'หายใจมีเสียงวี๊ด', 'หอบเหนื่อย/หายใจลำบาก (RR>21 หรือ HR>100 หรือ SpO2<94%)', 'ไอ', 'มีเสมหะ', 'ไอเป็นเลือด', 'ถุงลมเลือดออก', 'ไม่พบ'],
    cardiovascular: ['เจ็บหน้าอก', 'ใจสั่น', 'BP ต่ำ (<90/60)', 'HR สูง (>100)', 'หน้ามืด/หมดสติ', 'โลหิตจาง', 'ซีด', 'ไม่พบ'],
    gastrointestinal: ['คลื่นไส้/อาเจียน', 'กลืนลำบาก', 'ท้องเสีย', 'ปวดบิดท้อง', 'เบื่ออาหาร', 'ดีซ่าน (ตัวเหลือง/ตาเหลือง)', 'ปวดแน่นชายโครงด้านขวา', 'เหงือกเลือดออก', 'แผลในปาก', 'เลือดออกในทางเดินอาหาร', 'ไม่พบ'],
    musculoskeletal: ['ปวดข้อ', 'ข้ออักเสบ', 'ปวดเมื่อยกล้ามเนื้อ', 'ไม่พบ'],
    vision: ['เยื่อบุตาอักเสบ (ตาแดง)', 'แผลที่กระจกตา', 'ไม่พบ'],
    urinary: ['ปัสสาวะสีชา/สีดำ', 'ปวดหลังส่วนเอว', 'ปัสสาวะออกน้อย', 'ปัสสาวะสีขุ่น', 'ไม่พบ'],
    skinAdditional: ['จุดเลือดออก', 'ฟกช้ำ', 'ปื้น/จ้ำเลือด', 'ไม่พบ'],
    entNose: ['เจ็บคอ', 'เลือดกำเดาไหล', 'ทอนซิลอักเสบ', 'ไม่พบ'],
    other: ['ไข้ Temp > 37.5 °C', 'อ่อนเพลีย', 'หนาวสั่น', 'ไม่พบ'],
    organInvolvement: ['ต่อมน้ำเหลืองโต', 'ม้ามโต', 'ตับอักเสบ', 'ไตอักเสบ', 'ไตวาย', 'กล้ามเนื้อหัวใจอักเสบ', 'ต่อมไทรอยด์อักเสบ', 'ปอดอักเสบ', 'ไม่พบ']
  },

  naranjoQuestions: [
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
  ],

  labCategories: {
    cbc: {
      name: 'CBC',
      emoji: '🩸',
      items: [
        { id: 'wbc', label: 'WBC', unit: '/µL' },
        { id: 'aec', label: 'Absolute eosinophil count (AEC)', unit: '/µL' },
        { id: 'neutrophil', label: 'Neutrophil (%)', unit: '%' },
        { id: 'lymphocyte', label: 'Lymphocyte (%)', unit: '%' },
        { id: 'atypicalLymphocytes', label: 'Atypical lymphocytes (%)', unit: '%' },
        { id: 'eosinophil', label: 'Eosinophil (%)', unit: '%' },
        { id: 'hemoglobin', label: 'Hemoglobin (Hb)', unit: 'g/dL' },
        { id: 'platelet', label: 'Platelet (Plt)', unit: '/µL' }
      ]
    },
    lft: {
      name: 'LFT (ตับ)',
      emoji: '💊',
      items: [
        { id: 'ast', label: 'AST', unit: 'U/L' },
        { id: 'alt', label: 'ALT', unit: 'U/L' },
        { id: 'alp', label: 'ALP', unit: 'U/L' },
        { id: 'totalBilirubin', label: 'Total Bilirubin', unit: 'mg/dL' },
        { id: 'directBilirubin', label: 'Direct Bilirubin', unit: 'mg/dL' }
      ]
    },
    rft: {
      name: 'RFT (ไต)',
      emoji: '🧫',
      items: [
        { id: 'bun', label: 'BUN', unit: 'mg/dL' },
        { id: 'creatinine', label: 'Creatinine', unit: 'mg/dL' },
        { id: 'egfr', label: 'eGFR', unit: 'mL/min/1.73m²' },
        { id: 'uo', label: 'UO (Urine output)', unit: 'mL/kg/hr' }
      ]
    },
    electrolytes: {
      name: 'Electrolytes',
      emoji: '⚡',
      items: [
        { id: 'na', label: 'Na', unit: 'mmol/L' },
        { id: 'k', label: 'K', unit: 'mmol/L' },
        { id: 'cl', label: 'Cl', unit: 'mmol/L' },
        { id: 'hco3', label: 'HCO3- (TCO2)', unit: 'mmol/L' },
        { id: 'ca', label: 'Ca', unit: 'mg/dL' },
        { id: 'mg', label: 'Mg', unit: 'mg/dL' },
        { id: 'phosphate', label: 'Phosphate', unit: 'mg/dL' }
      ]
    },
    urinalysis: {
      name: 'Urinalysis (UA)',
      emoji: '🧬',
      items: [
        { id: 'protein', label: 'Protein', unit: 'mg/dL / +' },
        { id: 'bloodRbc', label: 'Blood/RBC', unit: 'cells/HPF' },
        { id: 'wbc', label: 'WBC', unit: 'cells/HPF' },
        { id: 'nitrite', label: 'Nitrite', unit: 'pos/neg' },
        { id: 'leukocyteEsterase', label: 'Leukocyte esterase', unit: 'pos/neg' },
        { id: 'specificGravity', label: 'Specific gravity', unit: '' },
        { id: 'ph', label: 'pH', unit: '' },
        { id: 'glucose', label: 'Glucose', unit: 'mg/dL / +' },
        { id: 'ketone', label: 'Ketone', unit: '+' }
      ]
    },
    lung: {
      name: 'ปอด',
      emoji: '🫁',
      items: [
        { id: 'spo2', label: 'SpO2', unit: '%' },
        { id: 'lungFunction', label: 'Lung function (sound/CXR)', unit: '' }
      ]
    },
    cardiac: {
      name: 'หัวใจ',
      emoji: '❤️',
      items: [
        { id: 'troponinI', label: 'Troponin I', unit: 'ng/mL' },
        { id: 'troponinT', label: 'Troponin T', unit: 'ng/mL' },
        { id: 'ckMb', label: 'CK-MB', unit: 'ng/mL' },
        { id: 'ekg', label: 'EKG', unit: '' }
      ]
    },
    immunology: {
      name: 'Immunology / Allergy',
      emoji: '🔬',
      items: [
        { id: 'ige', label: 'IgE', unit: 'IU/mL' },
        { id: 'complement', label: 'Complement (C3/C4)', unit: 'mg/dL' }
      ]
    }
  },

  drugColors: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316', '#6366F1']
};

// ===========================================
// Initialization
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
  initBubbles();
  initPage0();
  initPage1();
  initPage2();
  initPage3();
  initPage4();
  initTabs();
  loadFromLocalStorage();
});

// ===========================================
// Background Bubbles Animation
// ===========================================

function initBubbles() {
  const bubblesContainer = document.getElementById('bubbles');
  for (let i = 0; i < 50; i++) {
    const bubble = document.createElement('div');
    const size = Math.random() * 30 + 10;
    bubble.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.1));
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      animation: float ${Math.random() * 15 + 15}s linear infinite;
      animation-delay: ${Math.random() * 8}s;
    `;
    bubblesContainer.appendChild(bubble);
  }
}

// ===========================================
// Tab Navigation
// ===========================================

function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const page = parseInt(btn.dataset.page);
      goToPage(page);
    });
  });
}

function goToPage(pageNum) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  // Show target page
  document.getElementById(`page${pageNum}`).classList.add('active');
  document.querySelector(`[data-page="${pageNum}"]`).classList.add('active');

  APP_STATE.currentPage = pageNum;
  saveToLocalStorage();

  // Generate summary if going to page 5
  if (pageNum === 5) {
    generateSummary();
  }
}

// ===========================================
// Page 0: Skin System
// ===========================================

function initPage0() {
  // Initialize checkboxes for rash shape
  populateCheckboxes('rashShapeCheckboxes', DATA_ARRAYS.rashShape, 'rashShape');
  populateCheckboxes('rashColorCheckboxes', DATA_ARRAYS.rashColor, 'rashColor');
  populateCheckboxes('skinPeelingCheckboxes', DATA_ARRAYS.skinPeeling, 'skinPeeling');
  populateCheckboxes('drynessCheckboxes', DATA_ARRAYS.dryness, 'dryness');
  populateCheckboxes('painCheckboxes', DATA_ARRAYS.pain, 'pain');
  populateCheckboxes('locationCheckboxes', DATA_ARRAYS.location, 'location');

  // Blister handlers
  setupBlisterCheckbox('smallBlisters', 'smallBlistersCount');
  setupBlisterCheckbox('mediumBlisters', 'mediumBlistersCount');
  setupBlisterCheckbox('largeBlisters', 'largeBlistersCount');

  // Discharge handlers
  setupDetailCheckbox('discharge', 'dischargeDetail');
  setupDetailCheckbox('crust', 'crustDetail');

  // Itching handlers
  setupItchingButtons();

  // Swelling handlers
  setupSwellingButtons();

  // Pustules handlers
  setupPustulesButtons();

  // Distribution select
  document.getElementById('distribution').addEventListener('change', function() {
    const otherInput = document.getElementById('distributionOther');
    otherInput.classList.toggle('hidden', this.value !== 'อื่นๆ');
  });

  // Symptom timing
  document.getElementById('symptomTiming').addEventListener('change', function() {
    const otherInput = document.getElementById('symptomTimingOther');
    otherInput.classList.toggle('hidden', this.value !== 'อื่นๆ ระบุ...');
  });

  // Image upload
  setupImageUpload();
}

function populateCheckboxes(containerId, items, dataKey) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = items.map(item => `
    <label class="checkbox-label">
      <input type="checkbox" data-key="${dataKey}" value="${item}">
      <span>${item}</span>
    </label>
  `).join('');
}

function setupBlisterCheckbox(checkboxId, countId) {
  const checkbox = document.getElementById(checkboxId);
  const countInput = document.getElementById(countId);

  if (checkbox && countInput) {
    checkbox.addEventListener('change', function() {
      countInput.classList.toggle('hidden', !this.checked);
    });
  }
}

function setupDetailCheckbox(checkboxId, detailId) {
  const checkbox = document.getElementById(checkboxId);
  const detailInput = document.getElementById(detailId);

  if (checkbox && detailInput) {
    checkbox.addEventListener('change', function() {
      detailInput.classList.toggle('hidden', !this.checked);
    });
  }
}

function setupItchingButtons() {
  const yesBtn = document.getElementById('itchingYes');
  const noBtn = document.getElementById('itchingNo');
  const severityDiv = document.getElementById('itchingSeverity');
  const muchBtn = document.getElementById('itchingMuch');
  const littleBtn = document.getElementById('itchingLittle');

  yesBtn.addEventListener('click', function() {
    yesBtn.classList.toggle('active');
    noBtn.classList.remove('active');
    severityDiv.classList.toggle('hidden', !yesBtn.classList.contains('active'));
    if (!yesBtn.classList.contains('active')) {
      muchBtn.classList.remove('active-red');
      littleBtn.classList.remove('active-yellow');
    }
  });

  noBtn.addEventListener('click', function() {
    noBtn.classList.toggle('active-green');
    yesBtn.classList.remove('active');
    severityDiv.classList.add('hidden');
    muchBtn.classList.remove('active-red');
    littleBtn.classList.remove('active-yellow');
  });

  muchBtn.addEventListener('click', function() {
    muchBtn.classList.toggle('active-red');
    littleBtn.classList.remove('active-yellow');
  });

  littleBtn.addEventListener('click', function() {
    littleBtn.classList.toggle('active-yellow');
    muchBtn.classList.remove('active-red');
  });
}

function setupSwellingButtons() {
  const yesBtn = document.getElementById('swellingYes');
  const noBtn = document.getElementById('swellingNo');
  const sizeInput = document.getElementById('swellingSize');

  yesBtn.addEventListener('click', function() {
    yesBtn.classList.toggle('active');
    noBtn.classList.remove('active');
    sizeInput.classList.toggle('hidden', !yesBtn.classList.contains('active'));
  });

  noBtn.addEventListener('click', function() {
    noBtn.classList.toggle('active-green');
    yesBtn.classList.remove('active');
    sizeInput.classList.add('hidden');
    sizeInput.value = '';
  });
}

function setupPustulesButtons() {
  const yesBtn = document.getElementById('pustulesYes');
  const noBtn = document.getElementById('pustulesNo');
  const detailInput = document.getElementById('pustulesDetail');

  yesBtn.addEventListener('click', function() {
    yesBtn.classList.toggle('active');
    noBtn.classList.remove('active');
    detailInput.classList.toggle('hidden', !yesBtn.classList.contains('active'));
  });

  noBtn.addEventListener('click', function() {
    noBtn.classList.toggle('active-green');
    yesBtn.classList.remove('active');
    detailInput.classList.add('hidden');
    detailInput.value = '';
  });
}

function setupImageUpload() {
  const imageInput = document.getElementById('imageInput');
  const uploadPrompt = document.getElementById('uploadPrompt');
  const imagePreview = document.getElementById('imagePreview');
  const previewImg = document.getElementById('previewImg');
  const deleteBtn = document.getElementById('deleteImage');

  imageInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = function() {
        APP_STATE.uploadedImage = reader.result;
        previewImg.src = reader.result;
        uploadPrompt.classList.add('hidden');
        imagePreview.classList.remove('hidden');
        saveToLocalStorage();
      };
      reader.readAsDataURL(file);
    }
  });

  deleteBtn.addEventListener('click', function() {
    APP_STATE.uploadedImage = null;
    imageInput.value = '';
    previewImg.src = '';
    uploadPrompt.classList.remove('hidden');
    imagePreview.classList.add('hidden');
    saveToLocalStorage();
  });
}

// ===========================================
// Page 1: Other Systems
// ===========================================

function initPage1() {
  const systemsContainer = document.getElementById('systemsContainer');
  const organContainer = document.getElementById('organCheckboxes');

  const systemNames = {
    respiratory: '1. ระบบหายใจ',
    cardiovascular: '2. ระบบไหลเวียนโลหิต',
    gastrointestinal: '3. ระบบทางเดินอาหาร',
    musculoskeletal: '4. ระบบกระดูกและกล้ามเนื้อ',
    vision: '5. ระบบการมองเห็น',
    urinary: '6. ระบบขับถ่าย',
    skinAdditional: '7. ระบบผิวหนัง (เพิ่มเติม)',
    entNose: '8. ระบบหู คอ จมูก',
    other: '9. ระบบอื่นๆ'
  };

  let html = '';
  for (const [key, name] of Object.entries(systemNames)) {
    html += `
      <div class="system-category">
        <div class="system-category-header">${name}</div>
        <div class="checkbox-grid grid-2">
          ${DATA_ARRAYS.systems[key].map(symptom => `
            <div class="symptom-item">
              <label class="checkbox-label">
                <input type="checkbox" data-system="${key}" value="${symptom}">
                <span>${symptom}</span>
              </label>
              <input type="text" class="detail-input hidden mt-2" data-system-detail="${key}" data-symptom="${symptom}" placeholder="ระบุรายละเอียดเพิ่มเติม...">
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  systemsContainer.innerHTML = html;

  // Add event listeners for detail inputs
  systemsContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const system = this.dataset.system;
      const symptom = this.value;
      const detailInput = systemsContainer.querySelector(`input[data-system-detail="${system}"][data-symptom="${symptom}"]`);
      if (detailInput) {
        detailInput.classList.toggle('hidden', !this.checked);
      }
    });
  });

  // Organ involvement
  organContainer.innerHTML = DATA_ARRAYS.systems.organInvolvement.map(organ => `
    <div class="symptom-item">
      <label class="checkbox-label">
        <input type="checkbox" data-organ="true" value="${organ}">
        <span>${organ}</span>
      </label>
      <input type="text" class="detail-input hidden mt-2" data-organ-detail="${organ}" placeholder="ระบุรายละเอียดเพิ่มเติม...">
    </div>
  `).join('');

  organContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const organ = this.value;
      const detailInput = organContainer.querySelector(`input[data-organ-detail="${organ}"]`);
      if (detailInput) {
        detailInput.classList.toggle('hidden', !this.checked);
      }
    });
  });
}

// ===========================================
// Page 2: Lab Results
// ===========================================

function initPage2() {
  const labContainer = document.getElementById('labContainer');
  let html = '';

  for (const [categoryKey, category] of Object.entries(DATA_ARRAYS.labCategories)) {
    html += `
      <div class="lab-category">
        <div class="lab-category-header">
          <span>${category.emoji}</span>
          <span>${category.name}</span>
        </div>
        ${category.items.map(item => `
          <div class="lab-item">
            <input type="checkbox" id="lab_${categoryKey}_${item.id}" data-lab-category="${categoryKey}" data-lab-id="${item.id}">
            <label for="lab_${categoryKey}_${item.id}">${item.label}</label>
            <input type="text" id="lab_${categoryKey}_${item.id}_value" placeholder="ค่า" data-lab-value="${categoryKey}_${item.id}">
            <span class="unit">${item.unit}</span>
            <input type="text" id="lab_${categoryKey}_${item.id}_detail" placeholder="รายละเอียดเพิ่มเติม" data-lab-detail="${categoryKey}_${item.id}">
          </div>
        `).join('')}
      </div>
    `;
  }

  labContainer.innerHTML = html;
}

// ===========================================
// Page 3: Naranjo Algorithm
// ===========================================

function initPage3() {
  renderNaranjoAssessments();
}

function addNaranjoDrug() {
  const newId = Math.max(...APP_STATE.naranjoAssessments.map(a => a.id), 0) + 1;
  APP_STATE.naranjoAssessments.push({
    id: newId,
    drugName: '',
    answers: {}
  });
  renderNaranjoAssessments();
  saveToLocalStorage();
}

function removeNaranjoDrug(id) {
  if (APP_STATE.naranjoAssessments.length > 1) {
    APP_STATE.naranjoAssessments = APP_STATE.naranjoAssessments.filter(a => a.id !== id);
    renderNaranjoAssessments();
    saveToLocalStorage();
  }
}

function renderNaranjoAssessments() {
  const container = document.getElementById('naranjoContainer');
  container.innerHTML = APP_STATE.naranjoAssessments.map((assessment, index) => `
    <div class="naranjo-drug">
      <div class="naranjo-header">
        <h4 class="naranjo-title">ยาตัวที่ ${index + 1}</h4>
        ${APP_STATE.naranjoAssessments.length > 1 ? `<button class="btn btn-danger btn-sm" onclick="removeNaranjoDrug(${assessment.id})">ลบ</button>` : ''}
      </div>

      <div class="field">
        <label>ชื่อยา</label>
        <input type="text" placeholder="ระบุชื่อยา เช่น Amoxicillin" value="${assessment.drugName || ''}" onchange="updateNaranjoDrugName(${assessment.id}, this.value)">
      </div>

      ${DATA_ARRAYS.naranjoQuestions.map((q, qIdx) => {
        const qKey = `q${qIdx + 1}`;
        const answer = assessment.answers[qKey] || {};
        return `
          <div class="naranjo-question">
            <p>${q.q}</p>
            <div class="naranjo-answers">
              <button class="naranjo-answer-btn ${answer.type === 'yes' ? 'active yes' : ''}" onclick="updateNaranjoAnswer(${assessment.id}, '${qKey}', 'yes', ${q.yes})">
                ใช่ (${q.yes > 0 ? '+' : ''}${q.yes})
              </button>
              <button class="naranjo-answer-btn ${answer.type === 'no' ? 'active no' : ''}" onclick="updateNaranjoAnswer(${assessment.id}, '${qKey}', 'no', ${q.no})">
                ไม่ใช่ (${q.no})
              </button>
              <button class="naranjo-answer-btn ${answer.type === 'unknown' ? 'active unknown' : ''}" onclick="updateNaranjoAnswer(${assessment.id}, '${qKey}', 'unknown', ${q.unknown})">
                ไม่ทราบ (${q.unknown})
              </button>
            </div>
          </div>
        `;
      }).join('')}

      ${renderNaranjoResult(assessment)}
    </div>
  `).join('');
}

function updateNaranjoDrugName(id, name) {
  const assessment = APP_STATE.naranjoAssessments.find(a => a.id === id);
  if (assessment) {
    assessment.drugName = name;
    saveToLocalStorage();
  }
}

function updateNaranjoAnswer(id, question, type, value) {
  const assessment = APP_STATE.naranjoAssessments.find(a => a.id === id);
  if (assessment) {
    const current = assessment.answers[question];
    if (current && current.type === type) {
      assessment.answers[question] = {};
    } else {
      assessment.answers[question] = { type, value };
    }
    renderNaranjoAssessments();
    saveToLocalStorage();
  }
}

function calculateNaranjoScore(answers) {
  return Object.values(answers).reduce((sum, answer) => sum + (answer.value || 0), 0);
}

function renderNaranjoResult(assessment) {
  const score = calculateNaranjoScore(assessment.answers);
  let className, interpretation;

  if (score >= 9) {
    className = 'definite';
    interpretation = 'แน่นอน (Definite)';
  } else if (score >= 5) {
    className = 'probable';
    interpretation = 'น่าจะเป็น (Probable)';
  } else if (score >= 1) {
    className = 'possible';
    interpretation = 'เป็นไปได้ (Possible)';
  } else {
    className = 'doubtful';
    interpretation = 'ไม่น่าจะเป็น (Doubtful)';
  }

  return `
    <div class="naranjo-result ${className}">
      <h3>ผลการประเมิน</h3>
      <div class="score">${score} คะแนน</div>
      <div class="interpretation">${interpretation}</div>
    </div>
  `;
}

// ===========================================
// Page 4: Timeline
// ===========================================

function initPage4() {
  renderTimelineDrugs();
  renderAdrEvents();
}

function addTimelineDrug() {
  const newId = Math.max(...APP_STATE.timelineEvents.map(e => e.id), 0) + 1;
  const colorIndex = (APP_STATE.timelineEvents.length) % DATA_ARRAYS.drugColors.length;

  APP_STATE.timelineEvents.push({
    id: newId,
    drugName: '',
    color: DATA_ARRAYS.drugColors[colorIndex],
    events: [
      { type: 'drug_start', date: '', time: '', label: 'เริ่มให้ยา' },
      { type: 'drug_stop', date: '', time: '', label: 'หยุดยา' }
    ]
  });
  renderTimelineDrugs();
  saveToLocalStorage();
}

function removeTimelineDrug(id) {
  if (APP_STATE.timelineEvents.length > 1) {
    APP_STATE.timelineEvents = APP_STATE.timelineEvents.filter(e => e.id !== id);
    renderTimelineDrugs();
    saveToLocalStorage();
  }
}

function renderTimelineDrugs() {
  const container = document.getElementById('timelineDrugsContainer');
  container.innerHTML = APP_STATE.timelineEvents.map((drug, index) => `
    <div class="timeline-drug" style="border-color: ${drug.color}">
      <div class="timeline-drug-header">
        <div class="timeline-drug-title">
          <div class="drug-color-indicator" style="background: ${drug.color}"></div>
          <h4 style="color: ${drug.color}">ยาตัวที่ ${index + 1}</h4>
        </div>
        ${APP_STATE.timelineEvents.length > 1 ? `<button class="btn btn-danger btn-sm" onclick="removeTimelineDrug(${drug.id})">ลบ</button>` : ''}
      </div>

      <div class="field">
        <label>ชื่อยา</label>
        <input type="text" placeholder="ระบุชื่อยา" value="${drug.drugName || ''}" onchange="updateTimelineDrugName(${drug.id}, this.value)" style="border-color: ${drug.color}">
      </div>

      <div class="timeline-events">
        ${drug.events.map(event => `
          <div class="timeline-event">
            <label>${event.label}</label>
            <div class="timeline-event-inputs">
              <input type="date" value="${event.date || ''}" onchange="updateTimelineEvent(${drug.id}, '${event.type}', 'date', this.value)">
              <input type="time" value="${event.time || ''}" onchange="updateTimelineEvent(${drug.id}, '${event.type}', 'time', this.value)">
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function updateTimelineDrugName(id, name) {
  const drug = APP_STATE.timelineEvents.find(d => d.id === id);
  if (drug) {
    drug.drugName = name;
    saveToLocalStorage();
  }
}

function updateTimelineEvent(drugId, eventType, field, value) {
  const drug = APP_STATE.timelineEvents.find(d => d.id === drugId);
  if (drug) {
    const event = drug.events.find(e => e.type === eventType);
    if (event) {
      event[field] = value;
      saveToLocalStorage();
    }
  }
}

function addAdrEvent() {
  const newId = Math.max(...APP_STATE.adrEvents.map(e => e.id), 0) + 1;
  APP_STATE.adrEvents.push({
    id: newId,
    symptom: '',
    date: '',
    time: '',
    resolveDate: '',
    resolveTime: ''
  });
  renderAdrEvents();
  saveToLocalStorage();
}

function removeAdrEvent(id) {
  if (APP_STATE.adrEvents.length > 1) {
    APP_STATE.adrEvents = APP_STATE.adrEvents.filter(e => e.id !== id);
    renderAdrEvents();
    saveToLocalStorage();
  }
}

function renderAdrEvents() {
  const container = document.getElementById('adrEventsContainer');
  container.innerHTML = APP_STATE.adrEvents.map((adr, index) => `
    <div class="adr-event">
      <div class="adr-event-header">
        <h5>ADR ${index + 1}</h5>
        ${APP_STATE.adrEvents.length > 1 ? `<button class="btn btn-danger btn-sm" onclick="removeAdrEvent(${adr.id})">ลบ</button>` : ''}
      </div>

      <div class="field">
        <label>อาการ</label>
        <input type="text" placeholder="ระบุอาการ เช่น ผื่นขึ้น, คัน, บวม" value="${adr.symptom || ''}" onchange="updateAdrEvent(${adr.id}, 'symptom', this.value)">
      </div>

      <div class="grid grid-2">
        <div class="field">
          <label>วันที่เกิด</label>
          <input type="date" value="${adr.date || ''}" onchange="updateAdrEvent(${adr.id}, 'date', this.value)">
        </div>
        <div class="field">
          <label>เวลาที่เกิด</label>
          <input type="time" value="${adr.time || ''}" onchange="updateAdrEvent(${adr.id}, 'time', this.value)">
        </div>
      </div>

      <div class="grid grid-2">
        <div class="field">
          <label>วันที่หาย</label>
          <input type="date" value="${adr.resolveDate || ''}" onchange="updateAdrEvent(${adr.id}, 'resolveDate', this.value)">
        </div>
        <div class="field">
          <label>เวลาที่หาย</label>
          <input type="time" value="${adr.resolveTime || ''}" onchange="updateAdrEvent(${adr.id}, 'resolveTime', this.value)">
        </div>
      </div>
    </div>
  `).join('');
}

function updateAdrEvent(id, field, value) {
  const adr = APP_STATE.adrEvents.find(e => e.id === id);
  if (adr) {
    adr[field] = value;
    saveToLocalStorage();
  }
}

function toggleTimeline() {
  APP_STATE.showTimeline = !APP_STATE.showTimeline;
  const timeline = document.getElementById('visualTimeline');
  const btn = document.getElementById('toggleTimelineBtn');

  if (APP_STATE.showTimeline) {
    timeline.classList.remove('hidden');
    btn.innerHTML = '✕ ซ่อน Timeline';
    generateTimeline();
    setTimeout(() => {
      timeline.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  } else {
    timeline.classList.add('hidden');
    btn.innerHTML = '▶ สร้าง Timeline';
  }
}

function generateTimeline() {
  const chartDiv = document.getElementById('timelineChart');
  const today = new Date('2025-10-30T23:59:59');

  // Collect all dates
  const allDates = [today];
  APP_STATE.timelineEvents.forEach(drug => {
    drug.events.forEach(event => {
      if (event.date) {
        allDates.push(new Date(event.date + ' ' + (event.time || '00:00')));
      }
    });
  });
  APP_STATE.adrEvents.forEach(adr => {
    if (adr.date) {
      allDates.push(new Date(adr.date + ' ' + (adr.time || '00:00')));
    }
    if (adr.resolveDate) {
      allDates.push(new Date(adr.resolveDate + ' ' + (adr.resolveTime || '00:00')));
    }
  });

  if (allDates.length === 1) {
    chartDiv.innerHTML = '<p style="text-align:center; padding: 2rem; color: #6b7280;">กรุณากรอกวันที่และเวลาของยาหรือ ADR เพื่อแสดง Timeline</p>';
    return;
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
  const minWidth = Math.max(totalDays * 100, 800);

  let html = `<div style="min-width: ${minWidth}px">`;

  // Date headers
  html += '<div class="timeline-header"><div class="timeline-label"></div><div class="timeline-dates">';
  dateHeaders.forEach(date => {
    html += `<div class="timeline-date" style="min-width: 100px">${date.getDate()} ต.ค.</div>`;
  });
  html += '</div></div>';

  // Drug rows
  APP_STATE.timelineEvents.filter(drug => drug.events.some(e => e.date)).forEach((drug, idx) => {
    const drugStart = drug.events.find(e => e.type === 'drug_start');
    const drugStop = drug.events.find(e => e.type === 'drug_stop');

    if (!drugStart?.date) return;

    const drugStartDate = new Date(drugStart.date + ' ' + (drugStart.time || '00:00'));
    const drugStopDate = drugStop?.date ? new Date(drugStop.date + ' ' + (drugStop.time || '00:00')) : today;

    const startDayOffset = Math.floor((drugStartDate - minDate) / (1000 * 60 * 60 * 24));
    const endDayOffset = Math.floor((drugStopDate - minDate) / (1000 * 60 * 60 * 24)) + 1;
    const drugStartPos = (startDayOffset / totalDays) * 100;
    const drugWidth = ((endDayOffset - startDayOffset) / totalDays) * 100;
    const isOngoing = !drugStop?.date;

    html += `
      <div class="timeline-row">
        <div class="timeline-drug-name">${drug.drugName || `ยา ${idx + 1}`}</div>
        <div class="timeline-bar-container">
          <div class="timeline-bar" style="left: ${drugStartPos}%; width: ${Math.max(drugWidth, 2)}%; background: ${drug.color}">
            <div class="timeline-bar-title">${drug.drugName || 'ยา'}${isOngoing ? ' (Ongoing)' : ''}</div>
            <div class="timeline-bar-info">เริ่ม: ${drugStartDate.toLocaleDateString('th-TH')} ${drugStart.time || '00:00'}</div>
          </div>
        </div>
      </div>
    `;
  });

  // ADR rows
  APP_STATE.adrEvents.filter(adr => adr.date).forEach((adr, idx) => {
    const adrStartDate = new Date(adr.date + ' ' + (adr.time || '00:00'));
    const adrEndDate = adr.resolveDate ? new Date(adr.resolveDate + ' ' + (adr.resolveTime || '00:00')) : today;

    const startDayOffset = Math.floor((adrStartDate - minDate) / (1000 * 60 * 60 * 24));
    const endDayOffset = Math.floor((adrEndDate - minDate) / (1000 * 60 * 60 * 24)) + 1;
    const adrStartPos = (startDayOffset / totalDays) * 100;
    const adrWidth = ((endDayOffset - startDayOffset) / totalDays) * 100;
    const isOngoing = !adr.resolveDate;

    html += `
      <div class="timeline-row">
        <div class="timeline-drug-name" style="color: #dc2626">${adr.symptom || `ADR ${idx + 1}`}</div>
        <div class="timeline-bar-container">
          <div class="timeline-bar" style="left: ${adrStartPos}%; width: ${Math.max(adrWidth, 2)}%; background: #EF4444">
            <div class="timeline-bar-title">${adr.symptom || 'ADR'}${isOngoing ? ' (Ongoing)' : ''}</div>
            <div class="timeline-bar-info">เริ่ม: ${adrStartDate.toLocaleDateString('th-TH')} ${adr.time || '00:00'}</div>
          </div>
        </div>
      </div>
    `;
  });

  html += '</div>';
  chartDiv.innerHTML = html;
}

// ===========================================
// Page 5: Summary
// ===========================================

function generateSummary() {
  const container = document.getElementById('summaryContainer');

  let html = `
    <!-- ส่วนที่ 1: สรุปผลการวิเคราะห์อัตโนมัติ -->
    <div class="summary-section summary-blue">
      <div class="section-header">
        <span class="emoji">🤖</span>
        <h3>ส่วนที่ 1: สรุปผลการวิเคราะห์อัตโนมัติ</h3>
      </div>
      <div class="grid grid-2">
        <div class="summary-box">
          <p><strong>ประเภทแพ้ยา (Type of ADR):</strong></p>
          <p style="color: #6b7280; font-size: 0.875rem;">รอการประเมินจากข้อมูล...</p>
        </div>
        <div class="summary-box">
          <p><strong>ชนิดการแพ้ยา (Type of Reaction):</strong></p>
          <p style="color: #6b7280; font-size: 0.875rem;">รอการประเมินจากข้อมูล...</p>
        </div>
      </div>
    </div>

    <!-- ส่วนที่ 2: ยาที่มีรายงาน -->
    <div class="summary-section summary-orange">
      <div class="section-header">
        <span class="emoji">💊</span>
        <h3>ส่วนที่ 2: ยาที่มีรายงานการเกิดการแพ้ยาดังกล่าว</h3>
      </div>
      <div class="summary-box">
        <p><strong>ยาที่ผู้ป่วยได้รับ:</strong></p>
        <ul>
          ${APP_STATE.timelineEvents.filter(d => d.drugName).map(d => `<li>${d.drugName}</li>`).join('') || '<li style="color: #9ca3af">ยังไม่มีข้อมูลยา</li>'}
        </ul>
        <p style="margin-top: 1rem; color: #6b7280; font-size: 0.875rem;"><strong style="color: #ea580c;">รายงานการแพ้:</strong> รอข้อมูลและการวิเคราะห์จากระบบ...</p>
      </div>
    </div>

    <!-- ส่วนที่ 3: แนวทางการรักษา -->
    <div class="summary-section summary-purple">
      <div class="section-header">
        <span class="emoji">⚕️</span>
        <h3>ส่วนที่ 3: แนวทางการรักษา</h3>
      </div>
      <div class="summary-box">
        <p><strong>การจัดการเบื้องต้น:</strong></p>
        <p style="color: #6b7280; font-size: 0.875rem;">รอข้อมูลจาก Guidelines...</p>
      </div>
      <div class="summary-box">
        <p><strong>การรักษาเฉพาะตามชนิดการแพ้:</strong></p>
        <p style="color: #6b7280; font-size: 0.875rem;">รอข้อมูลจาก Guidelines...</p>
      </div>
    </div>

    <!-- ส่วนที่ 4: Naranjo Score -->
    <div class="summary-section summary-teal">
      <div class="section-header">
        <span class="emoji">📈</span>
        <h3>ส่วนที่ 4: ผลการประเมิน Naranjo และ Timeline</h3>
      </div>
      <h4 style="font-weight: 700; margin-bottom: 1rem; color: #0f766e;">ผลการประเมิน Naranjo Adverse Drug Reaction Probability Scale</h4>
      ${APP_STATE.naranjoAssessments.map((assessment, idx) => {
        const score = calculateNaranjoScore(assessment.answers);
        let probability, className;
        if (score >= 9) {
          probability = 'Definite (แน่นอน)';
          className = 'definite';
        } else if (score >= 5) {
          probability = 'Probable (น่าจะเป็น)';
          className = 'probable';
        } else if (score >= 1) {
          probability = 'Possible (เป็นไปได้)';
          className = 'possible';
        } else {
          probability = 'Doubtful (น่าสงสัย)';
          className = 'doubtful';
        }

        return `
          <div class="summary-box" style="background: #f0fdfa; border: 2px solid #14b8a6; margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h5 style="font-weight: 700; color: #0f766e; font-size: 1.125rem;">${assessment.drugName || `ยา ${idx + 1}`}</h5>
              <div style="text-align: right;">
                <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem;">คะแนนรวม</p>
                <p style="font-size: 1.875rem; font-weight: 700; color: #0f766e; margin: 0;">${score}</p>
              </div>
            </div>
            <div class="naranjo-result ${className}" style="margin-top: 0.75rem;">
              <p style="font-weight: 700; text-align: center; font-size: 1.125rem; margin: 0;">${probability}</p>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  container.innerHTML = html;
}

// ===========================================
// Clear Data Functions
// ===========================================

function clearPage0Data() {
  if (!confirm('คุณต้องการล้างข้อมูลหน้านี้หรือไม่?')) return;

  // Clear all inputs in page 0
  document.querySelectorAll('#page0 input, #page0 textarea, #page0 select').forEach(el => {
    if (el.type === 'checkbox') el.checked = false;
    else el.value = '';
  });

  // Reset buttons
  document.querySelectorAll('#page0 .option-btn').forEach(btn => {
    btn.classList.remove('active', 'active-red', 'active-yellow', 'active-green');
  });

  // Hide conditional inputs
  document.querySelectorAll('#page0 .hidden').forEach(el => {
    if (!el.classList.contains('upload-prompt') && !el.id.includes('Input')) {
      el.classList.add('hidden');
    }
  });

  // Clear image
  APP_STATE.uploadedImage = null;
  document.getElementById('imageInput').value = '';
  document.getElementById('uploadPrompt').classList.remove('hidden');
  document.getElementById('imagePreview').classList.add('hidden');

  saveToLocalStorage();
  alert('ล้างข้อมูลหน้า 1 เรียบร้อย');
}

function clearPage1Data() {
  if (!confirm('คุณต้องการล้างข้อมูลหน้านี้หรือไม่?')) return;

  document.querySelectorAll('#page1 input').forEach(el => {
    if (el.type === 'checkbox') el.checked = false;
    else el.value = '';
  });

  document.querySelectorAll('#page1 .hidden').forEach(el => {
    el.classList.add('hidden');
  });

  saveToLocalStorage();
  alert('ล้างข้อมูลหน้า 2 เรียบร้อย');
}

function clearPage2Data() {
  if (!confirm('คุณต้องการล้างข้อมูลหน้านี้หรือไม่?')) return;

  document.querySelectorAll('#page2 input').forEach(el => {
    if (el.type === 'checkbox') el.checked = false;
    else el.value = '';
  });

  saveToLocalStorage();
  alert('ล้างข้อมูลหน้า 3 เรียบร้อย');
}

function clearPage3Data() {
  if (!confirm('คุณต้องการล้างข้อมูลหน้านี้หรือไม่?')) return;

  APP_STATE.naranjoAssessments = [{
    id: 1,
    drugName: '',
    answers: {}
  }];

  renderNaranjoAssessments();
  saveToLocalStorage();
  alert('ล้างข้อมูลหน้า 4 เรียบร้อย');
}

function clearPage4Data() {
  if (!confirm('คุณต้องการล้างข้อมูลหน้านี้หรือไม่?')) return;

  APP_STATE.timelineEvents = [{
    id: 1,
    drugName: '',
    color: '#3B82F6',
    events: [
      { type: 'drug_start', date: '', time: '', label: 'เริ่มให้ยา' },
      { type: 'drug_stop', date: '', time: '', label: 'หยุดยา' }
    ]
  }];

  APP_STATE.adrEvents = [{
    id: 1,
    symptom: '',
    date: '',
    time: '',
    resolveDate: '',
    resolveTime: ''
  }];

  APP_STATE.showTimeline = false;

  renderTimelineDrugs();
  renderAdrEvents();
  document.getElementById('visualTimeline').classList.add('hidden');
  document.getElementById('toggleTimelineBtn').innerHTML = '▶ สร้าง Timeline';

  saveToLocalStorage();
  alert('ล้างข้อมูลหน้า 5 เรียบร้อย');
}

// ===========================================
// Utility Functions
// ===========================================

function printPage() {
  window.print();
}

function saveAllData() {
  saveToLocalStorage();
  alert('บันทึกข้อมูลทั้งหมดเรียบร้อยแล้ว!');
}

// ===========================================
// LocalStorage Functions
// ===========================================

function saveToLocalStorage() {
  const data = {
    currentPage: APP_STATE.currentPage,
    patientData: getPatientData(),
    skinData: getSkinData(),
    otherSystemsData: getOtherSystemsData(),
    labData: getLabData(),
    naranjoAssessments: APP_STATE.naranjoAssessments,
    timelineEvents: APP_STATE.timelineEvents,
    adrEvents: APP_STATE.adrEvents,
    uploadedImage: APP_STATE.uploadedImage,
    showTimeline: APP_STATE.showTimeline
  };

  localStorage.setItem('drugAllergyAssessment', JSON.stringify(data));
}

function loadFromLocalStorage() {
  const saved = localStorage.getItem('drugAllergyAssessment');
  if (!saved) return;

  try {
    const data = JSON.parse(saved);

    // Restore state
    if (data.naranjoAssessments) {
      APP_STATE.naranjoAssessments = data.naranjoAssessments;
      renderNaranjoAssessments();
    }

    if (data.timelineEvents) {
      APP_STATE.timelineEvents = data.timelineEvents;
      renderTimelineDrugs();
    }

    if (data.adrEvents) {
      APP_STATE.adrEvents = data.adrEvents;
      renderAdrEvents();
    }

    if (data.uploadedImage) {
      APP_STATE.uploadedImage = data.uploadedImage;
      document.getElementById('previewImg').src = data.uploadedImage;
      document.getElementById('uploadPrompt').classList.add('hidden');
      document.getElementById('imagePreview').classList.remove('hidden');
    }

    // Restore form inputs
    if (data.patientData) {
      Object.keys(data.patientData).forEach(key => {
        const el = document.getElementById(key);
        if (el) el.value = data.patientData[key] || '';
      });
    }

  } catch (e) {
    console.error('Error loading data:', e);
  }
}

function getPatientData() {
  return {
    patientName: document.getElementById('patientName')?.value || '',
    patientHN: document.getElementById('patientHN')?.value || '',
    patientAge: document.getElementById('patientAge')?.value || '',
    patientWeight: document.getElementById('patientWeight')?.value || '',
    patientDisease: document.getElementById('patientDisease')?.value || '',
    patientHistory: document.getElementById('patientHistory')?.value || ''
  };
}

function getSkinData() {
  return {}; // Simplified - can expand if needed
}

function getOtherSystemsData() {
  return {}; // Simplified - can expand if needed
}

function getLabData() {
  return {}; // Simplified - can expand if needed
}
