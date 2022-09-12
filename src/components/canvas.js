import React, { useRef, useEffect, useCallback, useMemo } from "react";
import styles from "./Canvas.module.css";

const Canvas = ({ wrongGuesses }) => {
	const canvasRef = useRef(null);

	const frame = useMemo(() => {
		return {
			topLeft: [60, 60],
			bottomCenter: [60, 300],
			bottomLeft: [15, 300],
			bottomRight: [105, 300],
			topRight: [180, 60],
			ropeEnd: [180, 90],
		};
	}, []);

	const LINE_WIDTH = 5;
	const shoulderPosition = 159;
	const hipPosition = 215;
	const armLength = 45;
	const armElevation = 18;
	const headRadius = 24;
	const headStart = frame.ropeEnd[1] + headRadius;
	const headEnd = headStart + headRadius;
	const bodyLength = 78;
	const bodyEndPoint = headEnd + bodyLength;
	const legLength = 36;
	const legAngle = 30;

	const drawFrame = useCallback(
		(ctx) => {
			ctx.beginPath();
			ctx.moveTo(frame.topLeft[0], frame.topLeft[1]);
			ctx.lineTo(frame.bottomCenter[0], frame.bottomCenter[1]);
			ctx.moveTo(frame.bottomLeft[0], frame.bottomLeft[1]);
			ctx.lineTo(frame.bottomRight[0], frame.bottomRight[1]);
			ctx.moveTo(frame.topLeft[0], frame.topLeft[1]);
			ctx.lineTo(frame.topRight[0], frame.topRight[1]);
			ctx.lineTo(frame.ropeEnd[0], frame.ropeEnd[1]);
			ctx.stroke();
		},
		[frame]
	);

	/* DRAW FUNCTIONS */
	const drawHead = (ctx) => {
		ctx.beginPath();
		ctx.arc(frame.ropeEnd[0], headStart, headRadius, 0, 2 * Math.PI);
		ctx.stroke();
	};
	const drawBody = (ctx) => {
		ctx.beginPath();
		ctx.moveTo(frame.ropeEnd[0], headEnd);
		ctx.lineTo(frame.ropeEnd[0], bodyEndPoint);

		ctx.stroke();
	};
	const drawLeftArm = (ctx) => {
		ctx.beginPath();
		ctx.moveTo(frame.ropeEnd[0], shoulderPosition);
		ctx.lineTo(frame.ropeEnd[0] - armLength, shoulderPosition - armElevation);

		ctx.stroke();
	};
	const drawRightArm = (ctx) => {
		ctx.beginPath();
		ctx.moveTo(frame.ropeEnd[0], shoulderPosition);
		ctx.lineTo(frame.ropeEnd[0] + armLength, shoulderPosition - armElevation);

		ctx.stroke();
	};
	const drawLeftLeg = (ctx) => {
		ctx.beginPath();
		ctx.moveTo(frame.ropeEnd[0], hipPosition);
		ctx.lineTo(frame.ropeEnd[0] - legAngle, bodyEndPoint + legLength);

		ctx.stroke();
	};
	const drawRightLeg = (ctx) => {
		ctx.beginPath();
		ctx.moveTo(frame.ropeEnd[0], hipPosition);
		ctx.lineTo(frame.ropeEnd[0] + legAngle, bodyEndPoint + legLength);

		ctx.stroke();
	};

	const clearCanvas = (canvas) => {
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, canvas.width, canvas.height);
		drawFrame(context);
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		context.strokeStyle = "#f9f9f9";
		context.lineWidth = LINE_WIDTH;

		drawFrame(context);
	}, [drawFrame]);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		console.log(`# of incorrect guesses = ${wrongGuesses.length}`);

		switch (wrongGuesses.length) {
			case 1:
				drawHead(context);
				break;
			case 2:
				drawBody(context);
				break;
			case 3:
				drawLeftArm(context);
				break;
			case 4:
				drawRightArm(context);
				break;
			case 5:
				drawLeftLeg(context);
				break;
			case 6:
				drawRightLeg(context);
				console.log(`You Lose!`);
				break;
			default:
				clearCanvas(canvas);

				console.log(`Let's Go!`);
		}
	}, [wrongGuesses]);

	return (
		<canvas
			width="300px"
			height="400px"
			ref={canvasRef}
			className={styles["game-canvas"]}
		/>
	);
};

export default Canvas;
