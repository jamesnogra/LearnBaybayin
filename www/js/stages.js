function goToStage(stage_num) {
	if (stage_num==1) {
		window.location = "stage1.html";
	}
	if (stage_num==2) {
		if (stage_1_score<35) {
			customAlert("Low Score", "Your score in stage 1 is not enough. Please try again on that stage.", "OK");
			return;
		}
		window.location = "stage2.html";
	}
}