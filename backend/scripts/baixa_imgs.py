import os
import sys
import requests
import time
from pathlib import Path

class BaixadorImagensAnimais:
    """
    Baixa imagens de animais usando APIs gratuitas com melhor controle de qualidade.
    Suporta: Pexels, Unsplash e fallback para Bing com filtros.
    """
    
    def __init__(self, api_choice='pexels'):
      
        self.api_choice = api_choice
        
        self.pexels_api_key = os.getenv('PEXELS_API_KEY', '')
        self.unsplash_access_key = os.getenv('UNSPLASH_ACCESS_KEY', '')
        
    def traduzir_nome_cientifico(self, nome_cientifico):
        
        traducoes = {
            'Loxodonta africana': 'african elephant',
            'Panthera leo': 'lion',
            'Panthera tigris': 'tiger',
            'Ursus maritimus': 'polar bear',
            'Gorilla gorilla': 'gorilla',
            'Pan troglodytes': 'chimpanzee',
            'Canis lupus': 'wolf',
            'Puma concolor': 'puma cougar',
            'Lynx lynx': 'lynx',
            'Felis catus': 'cat',
        }
        
        return traducoes.get(nome_cientifico, nome_cientifico)
    
    def baixar_pexels(self, termo_busca, pasta_destino, limite=10):
        """Baixa imagens do Pexels."""
        if not self.pexels_api_key:
            print("⚠️  Chave da API Pexels não configurada. Use: export PEXELS_API_KEY='sua_chave'")
            return False
            
        headers = {'Authorization': self.pexels_api_key}
        url = 'https://api.pexels.com/v1/search'
        
        query = f"{termo_busca} animal wildlife"
        
        params = {
            'query': query,
            'per_page': limite,
            'orientation': 'landscape'
        }
        
        try:
            response = requests.get(url, headers=headers, params=params, timeout=30)
            response.raise_for_status()
            data = response.json()
            
            fotos = data.get('photos', [])
            if not fotos:
                print(f"⚠️  Nenhuma foto encontrada para '{termo_busca}'")
                return False
                
            for i, foto in enumerate(fotos[:limite]):
                img_url = foto['src'].get('original') or foto['src'].get('large2x')
                extensao = '.jpg'
                
                nome_arquivo = f"{i+1}{extensao}"
                caminho_arquivo = pasta_destino / nome_arquivo
                
                # Download da imagem
                img_response = requests.get(img_url, timeout=30)
                img_response.raise_for_status()
                
                with open(caminho_arquivo, 'wb') as f:
                    f.write(img_response.content)
                
                print(f"  ✓ Baixada: {nome_arquivo}")
                time.sleep(0.5)  
                
            return True
            
        except Exception as e:
            print(f"❌ Erro ao baixar do Pexels: {e}")
            return False
    
    def baixar_unsplash(self, termo_busca, pasta_destino, limite=10):
        """Baixa imagens do Unsplash."""
        if not self.unsplash_access_key:
            print("⚠️  Chave da API Unsplash não configurada. Use: export UNSPLASH_ACCESS_KEY='sua_chave'")
            return False
            
        headers = {'Authorization': f'Client-ID {self.unsplash_access_key}'}
        url = 'https://api.unsplash.com/search/photos'
        
        query = f"{termo_busca} animal wildlife"
        
        params = {
            'query': query,
            'per_page': limite,
            'orientation': 'landscape'
        }
        
        try:
            response = requests.get(url, headers=headers, params=params, timeout=30)
            response.raise_for_status()
            data = response.json()
            
            fotos = data.get('results', [])
            if not fotos:
                print(f"⚠️  Nenhuma foto encontrada para '{termo_busca}'")
                return False
                
            for i, foto in enumerate(fotos[:limite]):
                img_url = foto['urls'].get('regular') or foto['urls'].get('small')
                extensao = '.jpg'
                
                nome_arquivo = f"{i+1}{extensao}"
                caminho_arquivo = pasta_destino / nome_arquivo
                
                # Download da imagem
                img_response = requests.get(img_url, timeout=30)
                img_response.raise_for_status()
                
                with open(caminho_arquivo, 'wb') as f:
                    f.write(img_response.content)
                
                print(f"  ✓ Baixada: {nome_arquivo}")
                time.sleep(0.5)  
                
            return True
            
        except Exception as e:
            print(f"❌ Erro ao baixar do Unsplash: {e}")
            return False
    
    def baixar_bing_melhorado(self, termo_busca, pasta_destino, limite=10):

        try:
            from bing_image_downloader import downloader
            
            # Criar pasta temporária
            temp_dir = pasta_destino.parent / 'temp_bing'
            temp_dir.mkdir(exist_ok=True)
            
            # Adiciona filtros para melhorar qualidade
            query_melhorada = f"{termo_busca} animal wildlife photo -drawing -cartoon -illustration"
            
            downloader.download(
                query_melhorada,
                limit=limite * 2,  #
                output_dir=str(temp_dir),
                adult_filter_off=False,  
                force_replace=False,
                timeout=30,
                verbose=False,
                filter="+filterui:photo-photo" 
            )
            
            # Mover e renomear arquivos
            pasta_temp_animal = temp_dir / termo_busca
            if pasta_temp_animal.exists():
                arquivos = sorted([
                    f for f in pasta_temp_animal.iterdir() 
                    if f.is_file() and f.suffix.lower() in ['.jpg', '.jpeg', '.png']
                ])
                
                contador = 0
                for arquivo in arquivos:
                    if contador >= limite:
                        break
                        
                    # Verificar tamanho mínimo (evitar miniaturas)
                    if arquivo.stat().st_size < 10000:
                        continue
                    
                    extensao = arquivo.suffix
                    novo_nome = f"{contador + 1}{extensao}"
                    caminho_novo = pasta_destino / novo_nome
                    
                    arquivo.rename(caminho_novo)
                    print(f"  ✓ Baixada: {novo_nome}")
                    contador += 1
                
                # Limpar pasta temporária
                import shutil
                shutil.rmtree(temp_dir)
                
                return contador > 0
            
            return False
            
        except Exception as e:
            print(f"❌ Erro ao baixar do Bing: {e}")
            return False
    
    def baixar_fotos_animal(self, nome_cientifico, pasta_base='imagens_animais', limite=10):
        """Baixa fotos de um animal específico."""
        
        # Criar pasta para o animal
        pasta_destino = Path(pasta_base) / nome_cientifico
        pasta_destino.mkdir(parents=True, exist_ok=True)
        
        print(f"\n🔍 Buscando fotos para: {nome_cientifico}")
        
        # Traduzir para melhor busca
        termo_busca = self.traduzir_nome_cientifico(nome_cientifico)
        print(f"   Termo de busca: {termo_busca}")
        
        sucesso = False
        
        if self.api_choice == 'pexels':
            sucesso = self.baixar_pexels(termo_busca, pasta_destino, limite)
        elif self.api_choice == 'unsplash':
            sucesso = self.baixar_unsplash(termo_busca, pasta_destino, limite)
        elif self.api_choice == 'bing':
            sucesso = self.baixar_bing_melhorado(termo_busca, pasta_destino, limite)
        
        if sucesso:
            print(f"✅ Sucesso: Fotos de '{nome_cientifico}' baixadas em '{pasta_destino}'")
        else:
            print(f"❌ Falha ao baixar fotos de '{nome_cientifico}'")
        
        return sucesso
    
    def processar_lista(self, arquivo_lista, limite=10):
        """Processa uma lista de animais de um arquivo."""
        
        if not os.path.exists(arquivo_lista):
            print(f"❌ Erro: Arquivo '{arquivo_lista}' não encontrado.")
            return
        
        with open(arquivo_lista, 'r', encoding='utf-8') as f:
            animais = [linha.strip() for linha in f if linha.strip()]
        
        if not animais:
            print("⚠️  Lista de animais vazia.")
            return
        
        print(f"📋 Encontrados {len(animais)} animais na lista")
        print(f"🔧 Usando API: {self.api_choice.upper()}")
        
        sucessos = 0
        falhas = 0
        
        for animal in animais:
            if self.baixar_fotos_animal(animal, limite=limite):
                sucessos += 1
            else:
                falhas += 1
            
            time.sleep(1)
        
        print(f"\n{'='*60}")
        print(f"📊 RESUMO:")
        print(f"   ✅ Sucessos: {sucessos}")
        print(f"   ❌ Falhas: {falhas}")
        print(f"{'='*60}")


def main():
    """Função principal."""
    
    # Configurações
    arquivo_entrada = 'animais.txt'
    api_escolhida = 'pexels' 
    
    if len(sys.argv) > 1:
        arquivo_entrada = sys.argv[1]
    if len(sys.argv) > 2:
        api_escolhida = sys.argv[2]
    
    # Criar baixador e processar
    baixador = BaixadorImagensAnimais(api_choice=api_escolhida)
    baixador.processar_lista(arquivo_entrada)


if __name__ == "__main__":
    main()