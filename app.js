let selectedCourses = [];  // آرایه برای ذخیره دروس انتخابی
let totalUnits = 0;        // مجموع واحدهای انتخابی
let currentPhase = 1;      // فاز کنونی در انتخاب واحد

document.getElementById('next-phase').addEventListener('click', () => {
    if (currentPhase === 1) {
        currentPhase++;
        document.getElementById('phase-1').classList.add('hidden');
        document.getElementById('phase-2').classList.remove('hidden');
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
                    totalUnits += course.units;
                } else {
                    selectedCourses = selectedCourses.filter(item => item !== course);
                    totalUnits -= course.units;
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
    const progress = (totalUnits / 24) * 100;  // حداکثر 24 واحد
    document.getElementById('progress-fill').style.width = `${progress}%`;
    updateProgressBarColor(progress);
}

function updateProgressBarColor(progress) {
    if (progress < 50) {
        document.getElementById('progress-fill').style.backgroundColor = 'red'; // کمتر از 12 واحد
    } else if (progress < 80) {
        document.getElementById('progress-fill').style.backgroundColor = 'yellow'; // 12 تا 20 واحد
    } else if (progress <= 100) {
        document.getElementById('progress-fill').style.backgroundColor = 'green'; // بیشتر از 20 واحد
    }
}

fetch('https://raw.githubusercontent.com/mbmmd/iauhelper/main/chart.json')
    .then(response => response.json())
    .then(data => renderSemesterSelection(data));
