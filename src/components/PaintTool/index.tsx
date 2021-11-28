import { FC, MouseEventHandler, ReactElement } from 'react';
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

const PaintTool: FC = () => {
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
        onToolClick={() => console.log(1)}
        label='清空'
        icon={<IconDeleteStroked size='large' />}
      />
    </div>
  );
};

export default PaintTool;
