document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    const closedDays = {}; // 날짜별 상태 저장

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'ko',
        timeZone: 'local',
        selectable: true,

        eventClick: function (info) {
            const isDelete = confirm(`'${info.event.title}' 일정을 삭제하시겠습니까?`);
            if (isDelete) {
                info.event.remove();
            }
        },

        dateClick: function (info) {
            const target = info.jsEvent.target;
            const dateStr = info.dateStr; // 로컬 기준 'YYYY-MM-DD'

            // 토글 버튼 클릭한 경우
            const toggleBtn = target.closest('.toggle-btn');
            if (toggleBtn) {
                const isClosed = toggleBtn.classList.contains('closed');

                // 상태 변경
                if (isClosed) {
                    delete closedDays[dateStr];
                } else {
                    closedDays[dateStr] = true;
                }

                // UI 반영
                toggleBtn.textContent = isClosed ? '영업중' : '휴무';
                toggleBtn.classList.toggle('closed', !isClosed);
                return; // 일정 등록은 막기
            }

            // IME(한글) 잔상 방지:가짜input으로 입력 버퍼 초기화
            const fakeInput = document.createElement('input');
            fakeInput.type = 'text';
            fakeInput.style.position = 'fixed';
            fakeInput.style.opacity = '0';
            fakeInput.style.pointerEvents = 'none';
            fakeInput.style.width = '0';
            fakeInput.style.height = '0';
            document.body.appendChild(fakeInput);
            fakeInput.focus();
            fakeInput.blur();
            document.body.removeChild(fakeInput);
           

            // prompt 실행(필요 시 30~100ms 조정)
            setTimeout(() => {
                const title = prompt('스케줄 제목을 입력하세요', ''); // 기본값 비움
                if (title && title.trim()) {
                    calendar.addEvent({
                        title: title.trim(),
                        start: dateStr,
                        allDay: true
                    });
                }
            }, 50);
        },

        dayCellDidMount: function (info) {
            //data-date로 통일 (로컬 기준 YYYY-MM-DD)
            const dateStr = info.el.getAttribute('data-date');

            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'toggle-btn';
            toggleBtn.textContent = closedDays[dateStr] ? '휴무' : '영업중';
            if (closedDays[dateStr]) toggleBtn.classList.add('closed');
            const topEl = info.el.querySelector('.fc-daygrid-day-top');
            if (topEl) topEl.appendChild(toggleBtn);
        }
    });

    calendar.render();
});
