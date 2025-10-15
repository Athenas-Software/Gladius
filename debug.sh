#!/bin/bash

set -e

if [ "$1" = "start" ]; then
    echo "🐳 Starting Gladius in debug mode..."
    export DOCKERFILE=Dockerfile.dev
    export NODE_ENV=development
    export VOLUME_MOUNT=".:/app"
    export DEBUG_PORT=9229
    docker-compose up -d
    echo "✅ Container started. Debug port 9229 is now available."
    echo "📝 To attach debugger:"
    echo "   1. Open VS Code"
    echo "   2. Go to Run and Debug (Ctrl+Shift+D)"
    echo "   3. Select 'Docker: Attach to Node' configuration"
    echo "   4. Press F5 to start debugging"
    echo ""
    echo "🔍 Container logs:"
    docker-compose logs -f gladius
elif [ "$1" = "stop" ]; then
    echo "🛑 Stopping container..."
    docker-compose down
    echo "✅ Container stopped."
elif [ "$1" = "logs" ]; then
    echo "📋 Showing container logs..."
    docker-compose logs -f gladius
elif [ "$1" = "shell" ]; then
    echo "🐚 Opening shell in container..."
    docker-compose exec gladius sh
elif [ "$1" = "attach" ]; then
    echo "🔗 Attaching to container..."
    docker-compose exec gladius sh
elif [ "$1" = "restart" ]; then
    echo "🔄 Restarting container..."
    docker-compose restart gladius
    echo "✅ Container restarted."
elif [ "$1" = "build" ]; then
    echo "🔨 Building debug image..."
    export DOCKERFILE=Dockerfile.dev
    docker-compose build --no-cache
    echo "✅ Debug image built."
elif [ "$1" = "prod" ]; then
    echo "🚀 Starting Gladius in production mode..."
    export DOCKERFILE=Dockerfile
    export NODE_ENV=production
    export VOLUME_MOUNT=".:/tmp"
    docker-compose up -d
    echo "✅ Production container started."
else
    echo "🚀 Gladius Docker Helper"
    echo ""
    echo "Usage: $0 {start|prod|stop|logs|shell|attach|restart|build}"
    echo ""
    echo "Commands:"
    echo "  start   - Start the application in debug mode"
    echo "  prod    - Start the application in production mode"
    echo "  stop    - Stop the container"
    echo "  logs    - Show container logs"
    echo "  shell   - Open shell in container"
    echo "  attach  - Attach to container"
    echo "  restart - Restart the container"
    echo "  build   - Rebuild the debug image"
    echo ""
    echo "Debug Setup:"
    echo "  1. Run: $0 start"
    echo "  2. Open VS Code"
    echo "  3. Use 'Docker: Attach to Node' debug configuration"
    echo "  4. Set breakpoints and start debugging!"
fi