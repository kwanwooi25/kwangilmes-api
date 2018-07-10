const onRequestSuccess = data => ({ success: true, error: null, data });
const onRequestFail = error => ({ success: false, error, data: null });

module.exports = { onRequestSuccess, onRequestFail };
