import passport from 'passport';
import LoginStrategies from '../../features/login/passport';

// Strategies
LoginStrategies(passport);

export default passport;
