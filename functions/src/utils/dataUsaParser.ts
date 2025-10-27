export function parseDataUsaMarkdown(markdown: string): any {
    const result: any = {
        demographics: {},
        economy: {}
    };

    const sections = markdown.split('## ');

    for (const section of sections) {
        if (section.startsWith('Demographics:')) {
            const lines = section.split('\n').slice(1).filter(line => line.trim() !== '');
            for (const line of lines) {
                const match = line.match(/^- \*\*(.*?)\*\*:\s*(.*)$/);
                if (match) {
                    const key = match[1].toLowerCase();
                    const value = match[2].trim();
                    result.demographics[key] = value;
                }
            }
        } else if (section.startsWith('Economy:')) {
            const lines = section.split('\n').slice(1).filter(line => line.trim() !== '');
            for (const line of lines) {
                const match = line.match(/^- \*\*(.*?)\*\*:\s*(.*)$/);
                if (match) {
                    const key = match[1].toLowerCase();
                    const value = match[2].trim();
                    result.economy[key] = value;
                }
            }
        }
    }
    return result;
}
