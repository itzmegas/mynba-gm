from nba_api.stats.endpoints import commonteamroster, leaguedashplayerstats
from nba_api.stats.static import teams, players
import json
import time
import os

def fetch_teams():
    """Obtener todos los equipos"""
    print("📋 Obteniendo información de equipos...")
    nba_teams = teams.get_teams()
    print(f"✅ {len(nba_teams)} equipos obtenidos")
    
    with open('../data/teams_colors.json', 'r') as f:
        teams_colors = json.load(f)

    colors_by_id = {team['id']: team['colors'] for team in teams_colors}
    for team in nba_teams:
            team['colors'] = colors_by_id.get(team['id'], [])
            
    return nba_teams

def fetch_players():
    """Obtener todos los jugadores"""
    print("📋 Obteniendo información de jugadores...")
    nba_players = players.get_players()
    print(f"✅ {len(nba_players)} jugadores obtenidos")
    return nba_players

def fetch_current_players():
    """Obtener estadísticas de jugadores de la temporada actual"""
    print("🏀 Obteniendo estadísticas de jugadores 2025-26...")
    
    try:
        player_stats = leaguedashplayerstats.LeagueDashPlayerStats(
            season='2025-26',
            season_type_all_star='Regular Season'
        )
        
        df = player_stats.get_data_frames()[0]
        print(f"✅ {len(df)} jugadores con estadísticas obtenidos")
        return df
        
    except Exception as e:
        print(f"❌ Error obteniendo estadísticas: {e}")
        return None

def fetch_team_rosters():
    """Obtener roster actual de cada equipo"""
    print("👥 Obteniendo rosters de equipos...")
    
    nba_teams = teams.get_teams()
    all_rosters = {}
    
    for i, team in enumerate(nba_teams):
        try:
            print(f"  📄 Procesando {team['full_name']} ({i+1}/{len(nba_teams)})")
            
            roster = commonteamroster.CommonTeamRoster(
                team_id=team['id'],
                season='2025-26'
            )
            
            roster_df = roster.get_data_frames()[0]
            all_rosters[team['abbreviation']] = {
                'team_info': team,
                'players': roster_df.to_dict('records')
            }
            
            # Pausa para no sobrecargar la API
            time.sleep(0.5)
            
        except Exception as e:
            print(f"  ⚠️  Error con {team['full_name']}: {e}")
            continue
    
    print(f"✅ {len(all_rosters)} rosters obtenidos")
    return all_rosters

def save_to_json():
    # Crear directorio data si no existe
    os.makedirs('../data', exist_ok=True)
    
    print("🚀 Iniciando descarga de datos NBA...")
    
    # 1. Obtener equipos
    teams_data = fetch_teams()
    with open('../data/teams.json', 'w') as f:
        json.dump(teams_data, f, indent=2)
    print("💾 Equipos guardados en data/teams.json")
    
    players_data = fetch_players()
    with open('../data/players.json', 'w') as f:
        json.dump(players_data, f, indent=2)
    print("💾 Rosters guardados en data/players.json")

    # 2. Obtener estadísticas de jugadores
    players_stats = fetch_current_players()
    if players_stats is not None:
        players_stats.to_json('../data/players_stats_2025_26.json', orient='records', indent=2)
        print("💾 Estadísticas guardadas en data/players_stats_2024_25.json")
    
    # 3. Obtener rosters detallados
    rosters_data = fetch_team_rosters()
    with open('../data/team_rosters_2025_26.json', 'w') as f:
        json.dump(rosters_data, f, indent=2)
    print("💾 Rosters guardados en data/team_rosters_2025_26.json")
    
    print("\n🎉 ¡Todos los datos descargados exitosamente!")
    print("📁 Archivos creados:")
    print("  - data/teams.json")
    print("  - data/players_stats_2025_26.json") 
    print("  - data/team_rosters_2025_26.json")

if __name__ == "__main__":
    save_to_json()
