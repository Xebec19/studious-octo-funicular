import { razorKey, razorSecret } from '../environment';
import RazorPay from 'razorpay'
const instance = new RazorPay({
    key_id: razorKey,
    key_secret: razorSecret,
  });

  export default instance;