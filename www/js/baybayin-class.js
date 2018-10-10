class Baybayin {

	constructor() {
		//all_characters has been arranged so that the first characters are long and the last characters are single characters
		this.all_characters = ['nga', 'nge_ngi', 'ngo_ngu', 'ba', 'ka', 'da', 'ga', 'ha', 'la', 'ma', 'na', 'pa', 'ra', 'sa', 'ta', 'wa', 'ya', 'be_bi', 'ke_ki', 'de_di', 'ge_gi', 'he_hi', 'le_li', 'me_mi', 'ne_ni', 'pe_pi', 're_ri', 'se_si', 'te_ti', 'we_wi', 'ye_yi', 'bo_bu', 'ko_ku', 'do_du', 'go_gu', 'ho_hu', 'lo_lu', 'mo_mu', 'no_nu', 'po_pu', 'ro_ru', 'so_su', 'to_tu', 'wo_wu', 'yo_yu', 'e_i', 'o_u', 'a', 'b', 'k', 'd', 'g', 'h', 'l', 'm', 'n', 'ng', 'p', 'r', 's', 't', 'w', 'y'];
	}

	tokenize(sentence) {
		this.sentence = sentence.toLowerCase();
		this.return_array = []
		var start_index = 0, end_index, temp_result;
		while (start_index<this.sentence.length) {
			for (var x=2; x>=0; x--) {
				end_index = start_index + x;
				temp_result = this.findMatch(this.sentence.substring(start_index, end_index));
				if (temp_result != null) {
					start_index += x;
					x = -1;
					this.return_array.push(temp_result);
				}
			}
		}
		return this.return_array;
	}

	findMatch(small_string) {
		var temp_split;
		if (small_string == ' ') { return 'space'; }
		for (var x=0; x<this.all_characters.length; x++) {
			temp_split = this.all_characters[x].split('_');
			for (var y=0; y<temp_split.length; y++) {
				if (temp_split[y].length>0 && temp_split[y]==small_string) {
					return this.all_characters[x];
				}
			}
		}
		return null;
	}

}