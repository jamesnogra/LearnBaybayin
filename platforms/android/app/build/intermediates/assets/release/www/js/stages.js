function goToStage(stage_num) {
	if (stage_num==1) {
		window.location = "stage1.html";
	}
	if (stage_num==2) {
		if (stage_score[1]<40) {
			customAlert("Low Score", "Your score in stage 1 is not enough. Please try again on that stage.", "OK");
			return;
		}
		window.location = "stage-general.html?stage=2";
	}
	if (stage_num==3) {
		if (stage_score[2]<15) {
			customAlert("Low Score", "Your score in stage 2 is not enough. Please try again on that stage.", "OK");
			return;
		}
		window.location = "stage-general.html?stage=3";
	}
	if (stage_num==4) {
		if (stage_score[3]<25) {
			customAlert("Low Score", "Your score in stage 3 is not enough. Please try again on that stage.", "OK");
			return;
		}
		window.location = "stage-general.html?stage=4";
	}
	if (stage_num==5) {
		if (stage_score[4]<25) {
			customAlert("Low Score", "Your score in stage 4 is not enough. Please try again on that stage.", "OK");
			return;
		}
		window.location = "stage-general.html?stage=5";
	}
	if (stage_num==6) {
		if (stage_score[5]<25) {
			customAlert("Low Score", "Your score in stage 5 is not enough. Please try again on that stage.", "OK");
			return;
		}
		window.location = "stage-general.html?stage=6";
	}
	if (stage_num==7) {
		if (stage_score[6]<75) {
			customAlert("Low Score", "Your score in stage 6 is not enough. Please try again on that stage.", "OK");
			return;
		}
		window.location = "stage-general.html?stage=7";
	}
	if (stage_num==8) {
		if (stage_score[7]<75) {
			customAlert("Low Score", "Your score in stage 7 is not enough. Please try again on that stage.", "OK");
			return;
		}
		window.location = "stage-general.html?stage=8";
	}
	if (stage_num==9) {
		if (stage_score[8]<75) {
			customAlert("Low Score", "Your score in stage 8 is not enough. Please try again on that stage.", "OK");
			return;
		}
		window.location = "stage-general.html?stage=9";
	}
	if (stage_num==10) {
		if (stage_score[9]<100) {
			customAlert("Low Score", "Your score in stage 9 is not enough. Please try again on that stage.", "OK");
			return;
		}
		window.location = "stage10.html";
	}
}