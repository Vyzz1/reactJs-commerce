/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useAuth } from "@/hooks/useAuth";
import useRefreshToken from "@/hooks/useRefreshToken";
import React, { useEffect, useState } from "react";
const PersitentLogin = ({
  children,
  isShowLoading = true,
  isInProtectedRoutes = false,
}: {
  isShowLoading?: boolean;
  children: React.ReactNode;
  isInProtectedRoutes: boolean;
}) => {
  const [loading, setLoading] = useState(true);

  const { auth, isLoggedOut } = useAuth();

  const refresh = useRefreshToken(isInProtectedRoutes);
  useEffect(() => {
    const verifyToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error("Refresh token error:", error);
      } finally {
        setLoading(false);
      }
    };

    !auth?.accessToken && !isLoggedOut ? verifyToken() : setLoading(false);
  }, [auth, refresh, isLoggedOut]);

  return (
    <>
      {loading ? (
        isShowLoading ? (
          <div className="flex justify-center items-center h-screen">
            <p>Loading...</p>
          </div>
        ) : (
          <> </>
        )
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default PersitentLogin;
