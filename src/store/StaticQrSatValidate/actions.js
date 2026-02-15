
import api from '../api.js'

export const REJECT_QR_LEAD_DOCUMENTS = ({
  commit
}, request) => {
  return api.get('qr-reject-lead/' + request.id)
}