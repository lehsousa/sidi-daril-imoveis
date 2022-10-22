import styles from './DashboardClient.module.css'

import { Link } from "react-router-dom";

import { useAuthValue } from "../context/AuthContext";
import { useFetchDocuments } from "../hooks/useFetchDocuments";

const DashboardClient = () => {
  const { user } = useAuthValue();
  const uid = user.id;

  //clientes do usuário
  const { documents: clientes, loading } = useFetchDocuments(
    "clientes",
    null,
    uid
  );

  const deleteDocument = (id) => {};

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {clientes && clientes.length === 0 ? (
        <div>
          <p>Não foram encontrados clientes</p>         
        </div>
      ) : (
        <div className={styles.dashboard}>
          {clientes &&
            clientes.map((cliente) => (
              <div key={cliente.id} className={styles.card}>
                <p>{cliente.name}</p>
                <div className={styles.actions}>
                  <Link to={`/cliente/${cliente.id}`} className="btn btn-outline">
                    Ver
                  </Link>
                  <Link
                    to={`/cliente/edit/${cliente.id}`}
                    className="btn btn-outline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => deleteDocument(cliente.id)}
                    className="btn btn-outline btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DashboardClient;
