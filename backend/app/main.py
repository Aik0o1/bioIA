import json
import requests

BASE_URL = "http://fauna.jbrj.gov.br/rest"


def salvar_json(dados, arquivo):
    with open(arquivo, "w", encoding="utf-8") as f:
        json.dump(dados, f, ensure_ascii=False, indent=4)


def buscar_animal(nome_cientifico):
    resultado = {}

    # 1️⃣ Buscar taxon
    r = requests.get(
        f"{BASE_URL}/v_taxon_data",
        params={"nome": f"eq.{nome_cientifico}"}
    )
    taxons = r.json()

    if not taxons:
        print("Espécie não encontrada")
        return None

    taxon = taxons[0]
    taxon_id = taxon["id_taxon"]

    resultado["nome_cientifico"] = nome_cientifico

    # 2️⃣ Classificação (mamífero, ave etc.)
    r = requests.get(
        f"{BASE_URL}/v_taxonomia_hierarquia",
        params={"taxonid": f"eq.{taxon_id}"}
    )
    hier = r.json()
    if hier:
        classe = hier[0].get("class")
        if classe:
            resultado["grupo"] = classe  # Mammalia, Aves, Reptilia...

    # 3️⃣ Nome popular
    r = requests.get(
        f"{BASE_URL}/v_nomes_vernaculares",
        params={"taxonid": f"eq.{taxon_id}"}
    )
    nomes = r.json()
    if nomes:
        resultado["nome"] = nomes[0].get("vernacularname")

    # 4️⃣ Habitat
    r = requests.get(
        f"{BASE_URL}/v_forma_de_vida_e_substrato",
        params={"taxonid": f"eq.{taxon_id}"}
    )
    habitat = r.json()
    if habitat:
        resultado["habitat"] = habitat[0].get("habitat")

    # 5️⃣ Estados de ocorrência
    r = requests.get(
        f"{BASE_URL}/v_distribuicao",
        params={"taxonid": f"eq.{taxon_id}", "countrycode": "eq.BR"}
    )
    dist = r.json()
    estados = list({
        d.get("locality")
        for d in dist
        if d.get("locality")
    })
    if estados:
        resultado["estados_ocorrencia"] = estados

    # 6️⃣ Nível de ameaça (se existir)
    if taxon.get("id_dados_lista_brasil"):
        resultado["nivel_ameaca_extincao"] = "Possui registro em lista oficial"

    # 7️⃣ Características e papel ecológico
    # (nem sempre existem – só adiciona se houver)
    r = requests.get(
        f"{BASE_URL}/v_taxonomia_hierarquia",
        params={"taxonid": f"eq.{taxon_id}"}
    )
    desc = r.json()
    if desc:
        if desc[0].get("bibliographiccitation"):
            resultado["caracteristicas"] = desc[0]["bibliographiccitation"]
        if desc[0].get("references"):
            resultado["papel_ecologico"] = desc[0]["references"]

    return resultado


# ===== EXECUÇÃO =====
if __name__ == "__main__":
    animal = "Panthera onca"

    dados = buscar_animal(animal)

    if dados:
        arquivo = f"{animal.replace(' ', '_').lower()}.json"
        salvar_json(dados, arquivo)
        print(f"JSON salvo em {arquivo}")
