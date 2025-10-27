export function parseMarketingStrategyMarkdown(markdown: string): any {
    const result: any = {};

    // Split the markdown by top-level headers (##)
    const sections = markdown.split(/(?=^##\s)/gm).filter(s => s.trim() !== '');

    for (const section of sections) {
        const lines = section.split('\n').filter(line => line.trim() !== '');
        if (lines.length === 0) continue;

        const headerMatch = lines[0].match(/^##\s*(.*)$/);
        if (!headerMatch) continue;

        const header = headerMatch[1].trim().toLowerCase();
        const contentLines = lines.slice(1);

        // Simple parsing for now, can be extended for deeper structure if needed
        // For now, just store the raw text content under the lowercase header
        result[header] = contentLines.join('\n').trim();
    }

    return result;
}
