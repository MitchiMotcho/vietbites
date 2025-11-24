export default function Price({ value }: { value?: number }) {
    if (value == null || value === 0) return null;
    return <span className="font-semibold">${value.toFixed(2)}</span>;
}
