export default function Price({ value }: { value?: number }) {
    if (value == null) return null;
    return <span className="font-semibold">{value.toFixed(2)}$</span>;
}
