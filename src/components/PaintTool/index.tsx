import { FC, MouseEventHandler, ReactElement, RefObject } from 'react';
import './index.css';

import {
  IconSaveStroked,
  IconEditStroked,
  IconRedoStroked,
  IconDeleteStroked
} from '@douyinfe/semi-icons';

export interface PaintToolItemProps {
  className?: string;
  label: string;
  icon: ReactElement;
  onToolClick?: MouseEventHandler<HTMLDivElement>;
}

const PaintToolItem: FC<PaintToolItemProps> = (props) => {
  return (
    <div
      className={`painttool-toolitem ${props.className ? props.className : ''}`}
      onClick={props.onToolClick}
    >
      {props.icon}
      <span>{props.label}</span>
    </div>
  );
};

const PaintTool: FC<{ canvasRef: RefObject<HTMLCanvasElement> }> = (props) => {
  const handleClearToolClick = () => {
    const canvas = props.canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx && ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className='painttool-container'>
      <PaintToolItem label='保存' icon={<IconSaveStroked size='large' />} />
      <PaintToolItem label='画笔' icon={<IconEditStroked size='large' />} />
      <PaintToolItem
        label='撤销'
        icon={<IconRedoStroked className='rotate' size='large' />}
      />
      <PaintToolItem label='重做' icon={<IconRedoStroked size='large' />} />
      <PaintToolItem
        onToolClick={handleClearToolClick}
        label='清空'
        icon={<IconDeleteStroked size='large' />}
      />
    </div>
  );
};

export default PaintTool;
