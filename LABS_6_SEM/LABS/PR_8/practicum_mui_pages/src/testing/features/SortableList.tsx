import React, { useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDispatch, useSelector } from 'react-redux';
import { addList, setDraggedItems } from './quizSlice';
import { RootState } from '../../store';
import List from '@mui/material/List';
import { SortableItem } from '../components/SortableItem';

interface SortableListProps { index: number; items: string[] }
export default function SortableList({ index, items }: SortableListProps) {
  const dispatch = useDispatch();
  const lists = useSelector((s: RootState) => s.lists.lists);

  // initial list is added by parent Matching component

  const handleDragEnd = (e: any) => {
    const { active, over } = e;
    if (!over) return;
    const oldIndex = lists[index].indexOf(active.id);
    const newIndex = lists[index].indexOf(over.id);
    const newArr = arrayMove(lists[index], oldIndex, newIndex);
    dispatch(setDraggedItems({ index, items: newArr }));
  };

  const current = (lists && lists[index]) ? lists[index] : items;
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={current} strategy={verticalListSortingStrategy}>
        <List>
          {current.map((it: string) => <SortableItem key={it} item={it} />)}
        </List>
      </SortableContext>
    </DndContext>
  );
}
