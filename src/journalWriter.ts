import { TFile, Vault, moment } from 'obsidian';
import type { VocalogSettings } from './settings';

/**
 * 将内容写入日记文件
 * 直接追加到文件末尾
 */
export async function writeToJournal(
	content: string,
	settings: VocalogSettings,
	vault: Vault,
	targetDate?: moment.Moment
): Promise<void> {
	// 1. 计算日记文件路径
	const dateToUse = targetDate || moment();
	const fileName = dateToUse.format(settings.dailyNoteFormat) + '.md';
	const filePath = settings.outputFolder
		? `${settings.outputFolder}/${fileName}`
		: fileName;

	// 2. 确保输出文件夹存在
	if (settings.outputFolder) {
		const folderPath = settings.outputFolder;
		const folder = vault.getAbstractFileByPath(folderPath);
		if (!folder) {
			// 创建文件夹（包括父文件夹）
			await vault.createFolder(folderPath).catch(() => {
				// 文件夹可能已存在，忽略错误
			});
		}
	}

	// 3. 查找或创建文件
	let dailyNote = vault.getAbstractFileByPath(filePath);

	if (!dailyNote) {
		// 创建新文件
		dailyNote = await vault.create(filePath, '');
	}

	if (!(dailyNote instanceof TFile)) {
		throw new Error('Daily note is not a file');
	}

	// 4. 读取现有内容
	let existingContent = await vault.read(dailyNote);

	// 5. 更新 frontmatter updated 字段（如果存在）
	const nowIso = moment().format('YYYY-MM-DDTHH:mm');
	if (existingContent.includes('updated:')) {
		existingContent = existingContent.replace(/updated:\s*["'][^"']*["']/, `updated: "${nowIso}"`);
	}

	// 6. 追加新内容到文件末尾
	const trimmed = existingContent.trim();
	const newContent = trimmed.length > 0
		? existingContent.trimEnd() + '\n\n' + content + '\n'
		: content + '\n';

	// 7. 写入文件
	await vault.modify(dailyNote, newContent);
}
