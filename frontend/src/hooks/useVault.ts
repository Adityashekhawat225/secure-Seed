import { useEffect, useState } from "react";
import { api } from "../app/utils/api";
import { useAuth } from "../context/AuthContext";

export const useVault = () => {
  const { user } = useAuth();
  const [vault, setVault] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVault = async () => {
    if (!user) return;
    setLoading(true);
    const data = await api.getVault(user.token);
    setVault(data.vault || []);
    setLoading(false);
  };

  const addVaultItem = async (item: any) => {
    if (!user) return;
    await api.addVault(item, user.token);
    fetchVault();
  };

  const updateVaultItem = async (id: string, item: any) => {
    if (!user) return;
    await api.updateVault(id, item, user.token);
    fetchVault();
  };

  const deleteVaultItem = async (id: string) => {
    if (!user) return;
    await api.deleteVault(id, user.token);
    fetchVault();
  };

  useEffect(() => {
    fetchVault();
  }, [user]);

  return { vault, loading, addVaultItem, updateVaultItem, deleteVaultItem };
};
