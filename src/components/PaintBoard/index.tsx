import { FC, useState, useEffect, MouseEvent, RefObject } from 'react';
import './index.css';

import { IPoint } from '../../models/Point.model';

export type LinePoint = [IPoint, IPoint][];

const MOUSE_LEFT_BUTTON = 0;
const width = window.innerWidth;
const height = window.innerHeight;

const PaintBoard: FC<{ canvasRef: RefObject<HTMLCanvasElement> }> = (props) => {
  const [isPainting, setIsPainting] = useState(false);
  const [startPoint, setStartPoint] = useState<IPoint>({ x: 0, y: 0 });
  const [currentLinePoint, setCurrentLinePoint] = useState<LinePoint>([]);
  const [lineTrajectory, setLineTrajectory] = useState<LinePoint[]>([]);

  useEffect(() => {
    if (props.canvasRef.current) {
      const canvas = props.canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'rgb(249, 250, 251)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [props.canvasRef]);

  const handleCanvasMouseDown = (e: MouseEvent) => {
    if (e.button === MOUSE_LEFT_BUTTON && props.canvasRef.current) {
      setIsPainting(true);
      setStartPoint(getRatioPoint({ x: e.pageX, y: e.pageY }));
    }
  };

  const handleCanvasMouseMove = (e: MouseEvent) => {
    if (isPainting && props.canvasRef.current) {
      const endPoint: IPoint = getRatioPoint({ x: e.pageX, y: e.pageY });
      drawLine(startPoint, endPoint);
      setStartPoint(endPoint);
    }
  };

  const handleCanvasMouseUpAndLeave = () => {
    if (isPainting) {
      setLineTrajectory(() => {
        // 记录的画图轨迹不超过 20 条
        if (lineTrajectory.length >= 20) {
          return [...lineTrajectory, currentLinePoint].slice(1);
        }
        return [...lineTrajectory, currentLinePoint];
      });
      setCurrentLinePoint([]);
      setIsPainting(false);
    }
  };

  const drawLine = (startPoint: IPoint, endPoint: IPoint) => {
    if (props.canvasRef.current) {
      const ctx = props.canvasRef.current.getContext('2d');
      if (ctx) {
        setCurrentLinePoint([...currentLinePoint, [startPoint, endPoint]]);
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.stroke();
        ctx.closePath();
      }
    }
  };

  const getRatioPoint = (point: IPoint, ratio = 4) => {
    return {
      x: point.x * ratio,
      y: point.y * ratio
    };
  };

  return (
    <div className='paintboard-container'>
      <canvas
        className='paintboard-canvas'
        ref={props.canvasRef}
        width={width * 4}
        height={height * 4}
        style={{ width, height }}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUpAndLeave}
        onMouseLeave={handleCanvasMouseUpAndLeave}
      >
        当前浏览器不支持画布，请更新或更换浏览器重试。
      </canvas>
    </div>
  );
};

export default PaintBoard;
