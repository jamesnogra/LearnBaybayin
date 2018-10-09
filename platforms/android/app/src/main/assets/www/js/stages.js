function goToStage(stage_num) {
	if (stage_num==1) {
		window.location = "stage1.html";
	}
	if (stage_num==2) {
		if (stage_1_score<40) {
			customAlert("Low Score", "Your score in stage 1 is not enough. Please try again on that stage.", "OK");
			return;
		}
		window.location = "stage-general.html?stage=2";
	}
	if (stage_num==3) {
		if (stage_2_score<15) {
			customAlert("Low Score", "Your score in stage 2 is not enough. Please try again on that stage.", "OK");
			return;
		}
		window.location = "stage-general.html?stage=3";
	}
	if (stage_num==4) {
		if (stage_3_score<25) {
			customAlert("Low Score", "Your score in stage 3 is not enough. Please try again on that stage.", "OK");
			return;
		}
		window.location = "stage-general.html?stage=4";
	}
	if (stage_num==5) {
		if (stage_4_score<25) {
			customAlert("Low Score", "Your score in stage 4 is not enough. Please try again on that stage.", "OK");
			return;
		}
		window.location = "stage-general.html?stage=5";
	}
}