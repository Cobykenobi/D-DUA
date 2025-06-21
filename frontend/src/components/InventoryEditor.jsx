
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useToast } from '../context/ToastContext';

export default function InventoryEditor({ inventory, onChange }) {
  const { showToast } = useToast();

  const normalize = (list) =>
    Array.isArray(list)
      ? list.map((it) =>
          typeof it === 'string'
            ? { item: it, type: 'misc' }
            : { item: it.item || it.name || it, type: it.type || 'misc', amount: it.amount }
        )
      : [];

  const [items, setItems] = useState(normalize(inventory));
  const [input, setInput] = useState('');
  const [type, setType] = useState('weapon');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setItems(normalize(inventory));
  }, [inventory]);

  const addItem = () => {
    if (!input.trim()) return;
    const newItems = [...items, { item: input.trim(), type }];
    setItems(newItems);
    onChange(newItems);
    setInput('');
    showToast('Предмет додано', 'success');
  };

  const removeItem = (idx) => {
    const newItems = items.filter((_, i) => i !== idx);
    setItems(newItems);
    onChange(newItems);
    showToast('Предмет видалено', 'success');
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [moved] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, moved);
    setItems(newItems);
    onChange(newItems);
    showToast('Порядок змінено', 'success');
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          className="rounded-2xl px-3 py-1 bg-[#2c1a12] border border-dndgold text-dndgold flex-1"
          placeholder="Новий предмет"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-2xl px-2 bg-[#2c1a12] border border-dndgold text-dndgold"
        >
          <option value="weapon">Зброя</option>
          <option value="armor">Броня</option>
          <option value="potion">Зілля</option>
          <option value="misc">Інше</option>
        </select>
        <button
          type="button"
          onClick={addItem}
          className="bg-dndgold text-dndred font-dnd rounded-2xl px-3"
        >
          +
        </button>
      </div>

      <div className="mb-2">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-2xl px-2 bg-[#2c1a12] border border-dndgold text-dndgold"
        >
          <option value="all">Усі</option>
          <option value="weapon">Зброя</option>
          <option value="armor">Броня</option>
          <option value="potion">Зілля</option>
          <option value="misc">Інше</option>
        </select>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="inv">
          {(provided) => (
            <ul
              className="list-disc pl-6 text-dndgold/90"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {(filter === 'all' ? items : items.filter((i) => i.type === filter)).map(
                (item, i) => (
                  <Draggable key={i} draggableId={String(i)} index={i}>
                    {(prov) => (
                      <li
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                        className="flex items-center gap-2 mb-1"
                      >
                        <span>{item.item}</span>
                        <span className="text-xs text-dndgold/60">({item.type})</span>
                        <button
                          type="button"
                          onClick={() => removeItem(i)}
                          className="text-dndred font-bold"
                        >
                          ✗
                        </button>
                      </li>
                    )}
                  </Draggable>
                )
              )}
              {provided.placeholder}
              {items.filter((i) => (filter === 'all' ? true : i.type === filter)).length === 0 && (
                <li className="text-dndgold/60">Порожньо</li>
              )}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

