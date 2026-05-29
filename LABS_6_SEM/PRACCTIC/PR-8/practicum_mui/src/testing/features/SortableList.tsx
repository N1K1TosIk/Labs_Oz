import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import List from '@mui/material/List';
import { useDispatch, useSelector } from 'react-redux';
import { setDraggedItems } from './quizSlice';
import { RootState } from '../../store';
import { SortableItem } from '../components/SortableItem';

interface ComponentProps {
  index: number;
  answers: string[];
}

function SortableList({ index, answers }: ComponentProps) {
  const dispatch = useDispatch();
  const arr = useSelector((state: RootState) => state.lists.lists[index]);
  const draggedItems = arr || answers || [];

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = draggedItems.indexOf(active.id);
    const newIndex = draggedItems.indexOf(over.id);
    const nextItems = arrayMove(draggedItems, oldIndex, newIndex);
    dispatch(setDraggedItems({ index, items: nextItems }));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={draggedItems} strategy={verticalListSortingStrategy}>
        <List>
          {draggedItems.map((item) => (
            <SortableItem key={item} item={item} />
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
}

export default SortableList;
