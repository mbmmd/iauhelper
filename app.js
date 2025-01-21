document.addEventListener('DOMContentLoaded', function() {
  let selectedCourses = [];
  let currentPhase = 0;
  let totalPhases = 3;
  
  // بارگذاری داده‌های دروس از فایل JSON
  fetch('https://raw.githubusercontent.com/mbmmd/iauhelper/main/chart.json')
    .then(response => response.json())
    .then(data => {
      renderSemesterSelection(data);
    });

  // نمایش دروس ترم‌ها برای انتخاب
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

      // دکمه انتخاب همه دروس
      const selectAllButton = document.createElement('button');
      selectAllButton.classList.add('select-all');
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

      // ایجاد گزینه‌ها برای هر درس
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
            selectedCourses = selectedCourses.filter(c => c !== course);
          }
        };
        const label = document.createElement('label');
        label.setAttribute('for', checkbox.id);
        label.classList.add('text-white');
        label.textContent = course.name;
        courseDiv.appendChild(checkbox);
        courseDiv.appendChild(label);
        courseList.appendChild(courseDiv);
      });

      semesterDiv.appendChild(semesterTitle);
      semesterDiv.appendChild(courseList);
      semesterSelection.appendChild(semesterDiv);
    });
  }

  // حرکت به مرحله بعد
  document.getElementById('next-phase').addEventListener('click', () => {
    currentPhase += 1;
    if (currentPhase === 1) {
      displayAvailableCourses();
    }
    if (currentPhase < totalPhases) {
      updateProgressBar();
    }
  });

  // نمایش دروس قابل انتخاب بعد از مرحله اول
  function displayAvailableCourses() {
    const availableCoursesContainer = document.getElementById('available-courses');
    availableCoursesContainer.innerHTML = '';
    selectedCourses.forEach(course => {
      const courseBox = document.createElement('button');
      courseBox.classList.add('bg-yellow-500', 'text-white', 'p-3', 'rounded', 'w-full');
      courseBox.textContent = course.name;
      availableCoursesContainer.appendChild(courseBox);
    });
    document.getElementById('phase-2-title').classList.remove('hidden');
    availableCoursesContainer.classList.remove('hidden');
  }

  // به‌روزرسانی نوار پیشرفت
  function updateProgressBar() {
    const progressBarFill = document.getElementById('progress-fill');
    const percentage = ((currentPhase + 1) / totalPhases) * 100;
    progressBarFill.style.width = `${percentage}%`;
  }
});
