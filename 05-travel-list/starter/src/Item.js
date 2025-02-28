export default function Item({ item, onDeleteItems, onToggleChecked }) {
  return (
    <li>
      <input
        type="checkbox"
        // value={item.packed}
        checked={item.packed}
        onChange={() => {
          onToggleChecked(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}
