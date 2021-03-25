import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function CircularProgressLabel(props) {
	return (
		<>
			<Box position="relative" display="inline-flex">
				<CircularProgress
					variant="determinate"
					value={(props.value / props.valueMax) * 100}
				/>
				<Box
					top={0}
					left={0}
					bottom={0}
					right={0}
					position="absolute"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<Typography
						variant="caption"
						component="div"
						color="textSecondary"
					>{`${props.value}`}</Typography>
				</Box>
			</Box>
		</>
	);
}