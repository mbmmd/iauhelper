let selectedCourses = [];  // آرایه برای ذخیره دروس انتخابی
let currentPhase = 0;      // فاز کنونی در انتخاب واحد
let totalPhases = 3;       // تعداد فازها (انتخاب دروس، نمایش دروس معتبر، برنامه هفتگی)

document.getElementById('next-phase').addEventListener('click', () => {
    if (currentPhase === 0) {
        currentPhase++;
        renderAvailableCourses();
        document.getElementById('phase-2-title').classList.remove('hidden');
        document.getElementById('semester-selection').classList.add('hidden');
    }
    else if (currentPhase === 1) {
        currentPhase++;
        showSchedule();
    }
});

function renderSemesterSelection(data) {
    const semesterSelection = document.getElementById('semester-selection');
    data.program.semesters.forEach((semester, index) => {
        const semesterDiv = document.createElement('div');
        semesterDiv.classList.add('space-y-4');
        const semesterTitle = document.createElement('h3');
        semesterTitle.textContent = `ترم ${index + 1}`;
        semesterTitle.classList.add('text-xl', 'font-bold');

        const courseList = document.createElement('div');
        courseList.classList.add('grid', 'grid-cols-2', 'gap-4');

        const selectAllButton = document.createElement('button');
        selectAllButton.classList.add('bg-blue-500', 'text-white', 'p-3', 'rounded', 'w-full');
        selectAllButton.textContent = 'انتخاب همه دروس';
        selectAllButton.onclick = function() {
            semester.courses.forEach(course => {
                if (!selectedCourses.includes(course)) {
                    selectedCourses.push(course);
                    document.querySelector(`#checkbox-${course.code}`).checked = true;
                }
            });
        };
        semesterDiv.appendChild(selectAllButton);

        semester.courses.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.classList.add('flex', 'items-center', 'space-x-2');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `checkbox-${course.code}`;
            checkbox.classList.add('h-4', 'w-4');
            checkbox.onclick = function() {
                if (checkbox.checked) {
                    selectedCourses.push(course);
                } else {
                    selectedCourses = selectedCourses.filter(item => item !== course);
                }
                updateProgressBar();
            };

            const label = document.createElement('label');
            label.setAttribute('for', `checkbox-${course.code}`);
            label.textContent = `${course.name} (${course.code})`;

            courseDiv.appendChild(checkbox);
            courseDiv.appendChild(label);
            courseList.appendChild(courseDiv);
        });

        semesterDiv.appendChild(courseList);
        semesterSelection.appendChild(semesterDiv);
    });
}

function updateProgressBar() {
    const progress = (selectedCourses.length / 15) * 100;  // فرض بر 15 درس
    document.getElementById('progress-fill').style.width = `${progress}%`;
}

function renderAvailableCourses() {
    const availableCourses = document.getElementById('available-courses');
    availableCourses.innerHTML = '';  // Clear existing content

    selectedCourses.forEach(course => {
        const classBox = document.createElement('div');
        classBox.classList.add('class-box');
        classBox.textContent = `${course.name} (${course.code})`;

        availableCourses.appendChild(classBox);
    });

    document.getElementById('available-courses').classList.remove('hidden');
}

function showSchedule() {
    // نمایش برنامه هفتگی
    alert('نمایش برنامه هفتگی');
}

fetch('https://raw.githubusercontent.com/mbmmd/iauhelper/main/chart.json')
    .then(response => response.json())
    .then(data => renderSemesterSelection(data));
