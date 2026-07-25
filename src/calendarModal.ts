import { App, Modal, moment } from 'obsidian';

declare const activeDocument: Document;

export class CalendarModal extends Modal {
	selectedDates: Set<string>;
	currentMonth: moment.Moment;
	onSubmit: (dates: moment.Moment[]) => void;
	calendarEl: HTMLElement;

	constructor(app: App, onSubmit: (dates: moment.Moment[]) => void) {
		super(app);
		this.onSubmit = onSubmit;
		this.selectedDates = new Set();
		// 设置 locale 为中国，确保周日为一周的第一天
		moment.locale('zh-cn');
		this.currentMonth = moment().startOf('month');
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.addClass('vocalog-calendar-modal');

		contentEl.createEl('h2', { text: '选择日期' });

		// 月份导航
		this.createMonthNavigation(contentEl);

		// 日历容器
		this.calendarEl = contentEl.createDiv({ cls: 'calendar-container' });
		this.renderCalendar();

		// 快捷按钮
		contentEl.createEl('h3', { text: '快速选择' });
		const quickButtons = contentEl.createDiv({ cls: 'date-quick-options' });

		const addButton = (text: string, dates: string[]) => {
			const btn = quickButtons.createEl('button', { text });
			btn.onclick = () => {
				dates.forEach(d => this.selectedDates.add(d));
				this.renderCalendar();
				this.updateGenerateButton();
			};
		};

		addButton('今天', [moment().format('YYYY-MM-DD')]);
		addButton('昨天', [moment().subtract(1, 'day').format('YYYY-MM-DD')]);
		addButton('本周', this.getWeekDates(moment()));
		addButton('最近7天', this.getLast7Days());

		const clearBtn = quickButtons.createEl('button', { text: '清空', cls: 'mod-warning' });
		clearBtn.onclick = () => {
			this.selectedDates.clear();
			this.renderCalendar();
			this.updateGenerateButton();
		};

		// 底部按钮
		const buttonContainer = contentEl.createDiv({ cls: 'modal-button-container' });

		const generateBtn = buttonContainer.createEl('button', {
			text: `生成 (${this.selectedDates.size})`,
			cls: 'mod-cta'
		});
		generateBtn.setAttribute('id', 'generate-btn');
		generateBtn.onclick = () => {
			if (this.selectedDates.size === 0) {
				return;
			}
			this.close();
			this.submit();
		};

		const cancelBtn = buttonContainer.createEl('button', { text: '取消' });
		cancelBtn.onclick = () => {
			this.close();
		};
	}

	createMonthNavigation(containerEl: HTMLElement) {
		const nav = containerEl.createDiv({ cls: 'calendar-nav' });

		const prevBtn = nav.createEl('button', { text: '◀ 上月', cls: 'calendar-nav-btn' });
		prevBtn.onclick = () => {
			this.currentMonth.subtract(1, 'month');
			this.renderCalendar();
		};

		const monthLabel = nav.createSpan({
			text: this.currentMonth.format('YYYY年 MM月'),
			cls: 'calendar-month-label'
		});
		monthLabel.setAttribute('id', 'month-label');

		const nextBtn = nav.createEl('button', { text: '下月 ▶', cls: 'calendar-nav-btn' });
		nextBtn.onclick = () => {
			this.currentMonth.add(1, 'month');
			this.renderCalendar();
		};
	}

	renderCalendar() {
		this.calendarEl.empty();

		// 更新月份标签
		const monthLabel = activeDocument.getElementById('month-label');
		if (monthLabel) {
			monthLabel.textContent = this.currentMonth.format('YYYY年 MM月');
		}

		// 星期标题（周日到周六）
		const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
		const headerRow = this.calendarEl.createDiv({ cls: 'calendar-weekdays' });
		weekdays.forEach(day => {
			headerRow.createDiv({ text: day, cls: 'calendar-weekday' });
		});

		// 日期网格
		const daysGrid = this.calendarEl.createDiv({ cls: 'calendar-days' });

		const startOfMonth = this.currentMonth.clone().startOf('month');
		const endOfMonth = this.currentMonth.clone().endOf('month');

		// 计算月份第一天是周几（0=周日, 1=周一, ..., 6=周六）
		const firstDayOfWeek = startOfMonth.day();

		// 计算需要从上个月补充多少天
		const startDate = startOfMonth.clone().subtract(firstDayOfWeek, 'days');
		// 计算下个月需要补充的天数
		const lastDayOfWeek = endOfMonth.day();
		const endDate = endOfMonth.clone().add(6 - lastDayOfWeek, 'days');

		const today = moment().format('YYYY-MM-DD');
		let currentDate = startDate.clone();

		while (currentDate.isSameOrBefore(endDate, 'day')) {
			const dateStr = currentDate.format('YYYY-MM-DD');
			const dayEl = daysGrid.createDiv({ cls: 'calendar-day' });

			// 样式类
			if (!currentDate.isSame(this.currentMonth, 'month')) {
				dayEl.addClass('other-month');
			}
			if (currentDate.format('YYYY-MM-DD') === today) {
				dayEl.addClass('today');
			}
			if (this.selectedDates.has(dateStr)) {
				dayEl.addClass('selected');
			}
			if (currentDate.isAfter(moment(), 'day')) {
				dayEl.addClass('future');
			}

			dayEl.createSpan({ text: currentDate.format('D') });

			// 点击事件
			dayEl.onclick = () => {
				if (this.selectedDates.has(dateStr)) {
					this.selectedDates.delete(dateStr);
				} else {
					this.selectedDates.add(dateStr);
				}
				this.renderCalendar();
				this.updateGenerateButton();
			};

			currentDate.add(1, 'day');
		}
	}

	updateGenerateButton() {
		const btn = activeDocument.getElementById('generate-btn');
		if (btn) {
			btn.textContent = `生成 (${this.selectedDates.size})`;
		}
	}

	getWeekDates(date: moment.Moment): string[] {
		// 获取本周日到周六的日期
		const dayOfWeek = date.day(); // 0=周日, 1=周一, ..., 6=周六
		const start = date.clone().subtract(dayOfWeek, 'days'); // 回到本周日
		const dates: string[] = [];
		for (let i = 0; i < 7; i++) {
			dates.push(start.clone().add(i, 'days').format('YYYY-MM-DD'));
		}
		return dates;
	}

	getLast7Days(): string[] {
		const dates: string[] = [];
		for (let i = 0; i < 7; i++) {
			dates.push(moment().subtract(i, 'days').format('YYYY-MM-DD'));
		}
		return dates;
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}

	submit() {
		const dates = Array.from(this.selectedDates)
			.map(d => moment(d, 'YYYY-MM-DD'))
			.sort((a, b) => a.valueOf() - b.valueOf());

		this.onSubmit(dates);
	}
}
