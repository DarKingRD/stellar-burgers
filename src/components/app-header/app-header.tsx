import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { TUser } from '@utils-types';

export const AppHeader: FC = () => {
    const user = useSelector((state) => state.user.user) as TUser | null;
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const userName = user ? user.name : '';

    return <AppHeaderUI userName={userName} isAuthenticated={isAuthenticated} />;
}
