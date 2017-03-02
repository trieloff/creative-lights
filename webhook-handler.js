/**
 * WebHook handler for Adobe I/O Events.
 * @param challenge challenge required for registering WebHook
 */
function main(params) {
    var challenge = params.challenge;
    if (challenge) {
		return { "challenge": challenge };
    }
	if (params.asset && params.asset.mime_type) {
		if (params.asset.mime_type=="image/jpeg") {
			return {"color":"red"};
		} else if (params.asset.mime_type=="image/png") {
			return {"color":"green"};
		} else {
			return {"color":"blue"};
		}
	} else {
		return {"echo": params};	
	}
}