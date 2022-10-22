import styles from './DashboardCorretores.module.css'

import { Link } from "react-router-dom";

import { useAuthValue } from "../context/AuthContext";
import { useFetchDocuments } from "../hooks/useFetchDocuments";


const DashboardCorretores = () => {

  const { user } = useAuthValue();
  const uid = user.id;


  const { documents: corretores, loading } = useFetchDocuments(
    "corretores",
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
      {corretores && corretores.length === 0 ? (
        <div>
          <p>Não foram encontrados corretores</p>         
        </div>
      ) : (
        <div className={styles.dashboard}>
          {corretores &&
            corretores.map((corretor) => (
              <div key={corretor.id} className={styles.card}>
                <p>{corretor.name}</p>
                <div className={styles.actions}>
                  <Link to={`/corretor/${corretor.id}`} className="btn btn-outline">
                    Ver
                  </Link>
                  <Link
                    to={`/corretor/edit/${corretor.id}`}
                    className="btn btn-outline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => deleteDocument(corretor.id)}
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
  )
}

export default DashboardCorretores